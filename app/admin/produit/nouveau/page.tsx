import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-dark text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="text-primary" size={32} />
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary">Nova</span> Store - Admin
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour à l&apos;admin
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-dark mb-6">Ajouter un Nouveau Produit</h2>
          <ProductForm />
        </div>
      </main>
    </div>
  );
}
