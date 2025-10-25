'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export default function ProductList({ products }: { products: Product[] }) {
  const router = useRouter();

  const handleDelete = async (productId: string, productName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ?`)) {
      return;
    }

    try {
      // First attempt to delete without force
      let response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.status === 409) {
        // Product has orders, ask for confirmation
        const errorData = await response.json();
        if (errorData.needsConfirmation) {
          const confirmed = confirm(
            `${errorData.error}\n\nCela supprimera aussi toutes les commandes associées. Continuer?`
          );
          
          if (confirmed) {
            // Delete with force parameter
            response = await fetch(`/api/products/${productId}?force=true`, {
              method: 'DELETE',
            });
          } else {
            return;
          }
        }
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }

      const result = await response.json();
      toast.success(result.message || 'Produit supprimé avec succès!');
      router.refresh();
    } catch (error) {
      console.error('Error deleting product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la suppression du produit';
      toast.error(errorMessage);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Aucun produit pour le moment</p>
        <Link
          href="/admin/produit/nouveau"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Ajouter votre premier produit
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-48 bg-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-dark mb-2 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-primary">
                {product.price.toFixed(2)} DT
              </span>
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                Stock: {product.stock}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/produit/${product.id}`}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Edit size={16} />
                <span>Modifier</span>
              </Link>
              <button
                onClick={() => handleDelete(product.id, product.name)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
