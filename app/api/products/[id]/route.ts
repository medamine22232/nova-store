import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du produit' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, price, image, stock } = body;

    if (!name || !description || !image || price === undefined || stock === undefined) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        stock: parseInt(stock),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du produit' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('DELETE request for product ID:', params.id);

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      console.log('Product not found:', params.id);
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    console.log('Found product:', product.name);

    // Check for force parameter to bypass order check
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === 'true';

    // Check if product has orders
    const ordersCount = await prisma.order.count({
      where: { productId: params.id },
    });

    console.log('Orders count for product:', ordersCount);

    if (ordersCount > 0 && !force) {
      console.log('Product has orders, asking for confirmation');
      return NextResponse.json(
        { 
          error: `Ce produit a ${ordersCount} commande(s) associée(s). Voulez-vous vraiment le supprimer?`,
          ordersCount,
          needsConfirmation: true
        },
        { status: 409 }
      );
    }

    // Use transaction to delete orders first, then product
    await prisma.$transaction(async (tx) => {
      if (ordersCount > 0) {
        // Delete all orders for this product first
        const deletedOrders = await tx.order.deleteMany({
          where: { productId: params.id },
        });
        console.log('Deleted orders:', deletedOrders.count);
      }

      // Then delete the product
      await tx.product.delete({
        where: { id: params.id },
      });
    });

    console.log('Product deleted successfully');
    return NextResponse.json({ 
      message: ordersCount > 0 
        ? `Produit et ${ordersCount} commande(s) supprimé(s) avec succès` 
        : 'Produit supprimé avec succès'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    
    return NextResponse.json({ 
      error: 'Erreur lors de la suppression du produit',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
