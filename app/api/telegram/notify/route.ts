import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify this is an internal request (you could add API key authentication here)
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // Only allow requests from the same origin for security
    if (origin && !origin.includes(host || '')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orderData = await request.json();

    // Get credentials from environment variables (server-side only)
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram credentials not configured in environment variables");
      return NextResponse.json(
        { error: 'Bot configuration missing' },
        { status: 500 }
      );
    }

    const message = `
🛍️ *NOUVELLE COMMANDE - Nova Store*

*Produit:* ${orderData.product.name}
*Prix unitaire:* ${orderData.product.price.toFixed(2)} DT
*Quantité:* ${orderData.quantity}
*Total:* ${orderData.totalPrice.toFixed(2)} DT

👤 *Client:* ${orderData.fullName}
📞 *Téléphone:* ${orderData.phoneNumber}
📍 *Adresse:* ${orderData.deliveryAddress}

🆔 *ID Commande:* ${orderData.id}
📅 *Date:* ${new Date(orderData.createdAt).toLocaleString("fr-FR")}

💰 *Paiement:* À la livraison
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to send Telegram notification:", await response.text());
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}