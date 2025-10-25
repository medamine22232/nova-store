import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import OrderForm from '@/components/OrderForm';

export const dynamic = 'force-dynamic';

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-dark text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ShoppingCart className="text-primary" size={32} />
              <h1 className="text-2xl md:text-3xl font-bold">
                <span className="text-primary">Nova</span> Store
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux produits
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Image */}
            <div className="relative h-96 md:h-full min-h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info and Order Form */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {product.name}
              </h1>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  {product.price.toFixed(2)} DT
                </span>
              </div>

              <div className="mb-6 pb-6 border-b">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.stock > 0 ? (
                <>
                  <div className="mb-6">
                    <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                      ✓ En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})
                    </span>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-dark mb-4">
                      Commander ce produit
                    </h2>
                    <OrderForm product={product} />
                  </div>
                </>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-red-700 font-semibold text-lg">
                    Ce produit est actuellement épuisé
                  </p>
                </div>
              )}
            </div>
          </div>
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
