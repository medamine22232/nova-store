'use client';

import Link from 'next/link';
import { ShoppingCart, Package, Plus, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ProductList from '@/components/admin/ProductList';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  createdAt: string;
}

interface Order {
  id: string;
  fullName: string;
  phoneNumber: string;
  totalPrice: number;
  createdAt: string;
  quantity: number;
  product: {
    name: string;
  };
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders')
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.slice(0, 10)); // Show only 10 recent orders
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Déconnexion réussie');
        router.push('/admin/login');
      } else {
        toast.error('Erreur lors de la déconnexion');
      }
    } catch (error) {
      toast.error('Erreur de connexion');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-dark text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="text-primary" size={32} />
              <h1 className="text-2xl md:text-3xl font-bold">
                <span className="text-primary">Nova</span> Store - Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm text-gray-300 hover:text-primary transition-colors"
              >
                Voir la Boutique
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Produits</p>
                <p className="text-3xl font-bold text-dark">{products.length}</p>
              </div>
              <Package className="text-primary" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Commandes Récentes</p>
                <p className="text-3xl font-bold text-dark">{orders.length}</p>
              </div>
              <ShoppingCart className="text-primary" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">En Stock</p>
                <p className="text-3xl font-bold text-dark">
                  {products.reduce((acc, p) => acc + p.stock, 0)}
                </p>
              </div>
              <Package className="text-primary" size={40} />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-dark">Gestion des Produits</h2>
            <Link
              href="/admin/produit/nouveau"
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors space-x-2"
            >
              <Plus size={20} />
              <span>Ajouter un Produit</span>
            </Link>
          </div>
          <ProductList products={products} />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-dark mb-6">Commandes Récentes</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Aucune commande pour le moment</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Produit</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Téléphone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{order.fullName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{order.product.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{order.phoneNumber}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-primary">
                        {order.totalPrice.toFixed(2)} DT
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Nova Store. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
