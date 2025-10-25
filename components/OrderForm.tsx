'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function OrderForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    deliveryAddress: '',
    quantity: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          ...formData,
          totalPrice: product.price * formData.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la commande');
      }

      const data = await response.json();
      toast.success('Commande passée avec succès!');
      router.push(`/merci?orderId=${data.id}`);
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) || 1 : value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
          Nom Complet
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="Entrez votre nom complet"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
          Numéro de Téléphone
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="+216 20 123 456"
        />
      </div>

      {/* Delivery Address */}
      <div>
        <label htmlFor="deliveryAddress" className="block text-sm font-semibold text-gray-700 mb-2">
          Adresse de Livraison
        </label>
        <textarea
          id="deliveryAddress"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          placeholder="Adresse complète avec ville et code postal"
        />
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
          Quantité
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          max={product.stock}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Total Price */}
      <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-dark">Total:</span>
          <span className="text-2xl font-bold text-primary">
            {(product.price * formData.quantity).toFixed(2)} DT
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          💰 Paiement à la livraison
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {loading ? (
          <span>Traitement en cours...</span>
        ) : (
          <>
            <ShoppingCart size={20} />
            <span>Passer la Commande</span>
          </>
        )}
      </button>
    </form>
  );
}
