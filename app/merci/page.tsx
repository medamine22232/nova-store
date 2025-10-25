import Link from 'next/link';
import { CheckCircle, ShoppingCart, Home } from 'lucide-react';

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-dark text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="text-primary" size={32} />
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary">Nova</span> Store
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-6">
                <CheckCircle className="text-green-600" size={64} />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Merci pour votre commande !
            </h1>

            <p className="text-xl text-gray-700 mb-6">
              Votre commande a été passée avec succès
            </p>

            {searchParams.orderId && (
              <div className="bg-primary bg-opacity-10 rounded-lg p-4 mb-8">
                <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
                <p className="text-lg font-mono font-semibold text-primary">
                  {searchParams.orderId}
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-dark mb-4 text-center">
                Prochaines étapes
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3 mt-1">1.</span>
                  <span className="text-gray-700">
                    Nous allons vous contacter pour confirmer votre commande
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3 mt-1">2.</span>
                  <span className="text-gray-700">
                    Votre produit sera préparé et expédié dans les plus brefs délais
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3 mt-1">3.</span>
                  <span className="text-gray-700">
                    Le paiement se fera à la livraison
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t pt-8">
              <p className="text-gray-600 mb-6">
                Besoin d&apos;aide ? Nous sommes là pour vous assister
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors space-x-2"
                >
                  <Home size={20} />
                  <span>Retour à la Boutique</span>
                </Link>
              </div>
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
