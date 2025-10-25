const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'Smartphone Samsung Galaxy S23',
    description: 'Écran AMOLED 6.1 pouces, 256GB, 8GB RAM, Caméra 50MP, 5G',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    stock: 15,
  },
  {
    name: 'Laptop HP Pavilion 15',
    description: 'Intel Core i7, 16GB RAM, 512GB SSD, Écran Full HD 15.6 pouces',
    price: 3299.00,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    stock: 8,
  },
  {
    name: 'Casque Sony WH-1000XM5',
    description: 'Casque sans fil avec réduction de bruit active, autonomie 30h',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 20,
  },
  {
    name: 'Montre Connectée Apple Watch Series 9',
    description: 'GPS, Écran Always-On, Suivi santé et fitness, étanche',
    price: 1599.00,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
    stock: 12,
  },
  {
    name: 'Tablette iPad Air 2024',
    description: 'Écran 10.9 pouces Liquid Retina, Puce M1, 64GB, WiFi',
    price: 2199.00,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    stock: 10,
  },
  {
    name: 'Appareil Photo Canon EOS R50',
    description: 'Appareil photo mirrorless 24MP, 4K vidéo, WiFi, Bluetooth',
    price: 2799.00,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
    stock: 6,
  },
];

async function main() {
  console.log('🌱 Début du seed de la base de données...');

  // Supprime tous les produits existants
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  console.log('✅ Base de données nettoyée');

  // Ajoute les produits d'exemple
  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product,
    });
    console.log(`✅ Produit ajouté: ${product.name}`);
  }

  console.log('');
  console.log('🎉 Seed terminé avec succès!');
  console.log(`📦 ${sampleProducts.length} produits ajoutés`);
  console.log('');
  console.log('🚀 Visitez http://localhost:3000 pour voir votre boutique');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
