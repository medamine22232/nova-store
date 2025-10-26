'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Simple product data - you can edit this directly in the code
const PRODUCT = {
  id: '1',
  name: 'Smartphone Samsung Galaxy S21',
  description: 'Écran AMOLED 6.2 pouces, 128GB, 8GB RAM. Appareil photo triple 64MP. Batterie longue durée.',
  price: 1299.99,
  image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
  stock: 10
};

export default function HomePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    deliveryAddress: '',
    quantity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const totalPrice = PRODUCT.price * formData.quantity;
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: PRODUCT.name,
          productPrice: PRODUCT.price,
          ...formData,
          totalPrice
        }),
      });

      if (response.ok) {
        toast.success('Commande envoyée avec succès!');
        setFormData({
          fullName: '',
          phoneNumber: '',
          deliveryAddress: '',
          quantity: 1
        });
      } else {
        toast.error('Erreur lors de l\'envoi de la commande');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de l\'envoi de la commande');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = PRODUCT.price * formData.quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🛍️ <span className="text-orange-500">Nova Store</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={PRODUCT.image}
              alt={PRODUCT.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Product Info & Order Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Product Details */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {PRODUCT.name}
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {PRODUCT.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-orange-500">
                  {PRODUCT.price.toFixed(2)} DT
                </div>
                <div className="text-sm text-gray-500">
                  {PRODUCT.stock > 0 ? (
                    <span className="text-green-600 font-medium">
                      ✅ En stock ({PRODUCT.stock} disponibles)
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      ❌ Épuisé
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Form */}
            {PRODUCT.stock > 0 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Passer une commande
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: 20123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse de livraison *
                  </label>
                  <textarea
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Votre adresse complète de livraison"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    max={PRODUCT.stock}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Total Price */}
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-orange-600">{totalPrice.toFixed(2)} DT</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Passer la commande'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  💳 Paiement à la livraison
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-4">🚚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Livraison Rapide</h3>
            <p className="text-gray-600 text-sm">Livraison dans toute la Tunisie sous 24-48h</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-4">💳</div>
            <h3 className="font-semibold text-gray-900 mb-2">Paiement Sécurisé</h3>
            <p className="text-gray-600 text-sm">Paiement à la livraison, aucun risque</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="font-semibold text-gray-900 mb-2">Support Client</h3>
            <p className="text-gray-600 text-sm">Service client disponible 7j/7</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 Nova Store. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
