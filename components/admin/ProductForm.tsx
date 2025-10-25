'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    image: product?.image || '',
    stock: product?.stock || 0,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(product?.image || '');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Type de fichier invalide. Seuls JPG, PNG et WebP sont autorisés.');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('Fichier trop volumineux. Taille maximale: 5MB.');
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Clear any previous image errors
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return formData.image || null;

    setUploadingImage(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erreur lors du téléchargement de l\'image');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du produit est requis';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0';
    }

    if (!selectedFile && !formData.image) {
      newErrors.image = 'Une image est requise';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Le stock ne peut pas être négatif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setLoading(true);

    try {
      // Upload image first if a new file is selected
      let imageUrl = formData.image;
      if (selectedFile) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          toast.error('Erreur lors du téléchargement de l\'image');
          return;
        }
        imageUrl = uploadedUrl;
      }

      const productData = {
        ...formData,
        image: imageUrl,
      };

      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement du produit');
      }

      toast.success(product ? 'Produit modifié avec succès!' : 'Produit ajouté avec succès!');
      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'stock'].includes(name) ? parseFloat(value) || 0 : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Nom du Produit <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: Smartphone Samsung Galaxy"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Description détaillée du produit..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
          Prix (DT) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="199.99"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-500">{errors.price}</p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-2">
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            errors.stock ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="10"
        />
        {errors.stock && (
          <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
          Image du Produit <span className="text-red-500">*</span>
        </label>
        <div className="space-y-4">
          <input
            type="file"
            id="image"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.image ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="text-sm text-gray-600">
            Formats acceptés: JPG, PNG, WebP. Taille max: 5MB
          </p>
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image}</p>
          )}
          {previewUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Aperçu:</p>
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Aperçu"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p>Téléchargement...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading || uploadingImage ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>
                {uploadingImage ? 'Téléchargement...' : 'Enregistrement...'}
              </span>
            </div>
          ) : (
            <>
              <Save size={20} />
              <span>{product ? 'Modifier' : 'Ajouter'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
