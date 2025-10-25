import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, fullName, phoneNumber, deliveryAddress, quantity, totalPrice } = body;

    // Check if product exists and has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: 'Stock insuffisant' }, { status: 400 });
    }

    // Create order and update stock in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // Update product stock
      await tx.product.update({
        where: { id: productId },
        data: {
          stock: {
            decrement: quantity,
          },
        },
      });

      // Create order
      return tx.order.create({
        data: {
          productId,
          fullName,
          phoneNumber,
          deliveryAddress,
          quantity: parseInt(quantity),
          totalPrice: parseFloat(totalPrice),
        },
        include: {
          product: true,
        },
      });
    });

    // Send Telegram notification
    await sendTelegramNotification(order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Erreur lors de la création de la commande' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des commandes' }, { status: 500 });
  }
}
