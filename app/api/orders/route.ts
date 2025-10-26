import { NextRequest, NextResponse } from 'next/server';

// Simple order API that sends directly to Telegram
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { productName, productPrice, fullName, phoneNumber, deliveryAddress, quantity, totalPrice } = data;
    
    if (!productName || !fullName || !phoneNumber || !deliveryAddress || !quantity) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Send to Telegram
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramBotToken && telegramChatId) {
      const message = `
🛍️ *NOUVELLE COMMANDE - Nova Store*

📦 *Produit:* ${productName}
💰 *Prix unitaire:* ${productPrice} DT
📊 *Quantité:* ${quantity}
💳 *Total:* ${totalPrice.toFixed(2)} DT

👤 *Client:*
• Nom: ${fullName}
• Téléphone: ${phoneNumber}
• Adresse: ${deliveryAddress}

📅 *Date:* ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' })}

#NovaStore #Commande
      `.trim();

      try {
        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: message,
              parse_mode: 'Markdown',
            }),
          }
        );

        if (!telegramResponse.ok) {
          console.error('Telegram API error:', await telegramResponse.text());
        }
      } catch (telegramError) {
        console.error('Error sending to Telegram:', telegramError);
        // Don't fail the order if Telegram fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Commande reçue avec succès!' 
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la commande' },
      { status: 500 }
    );
  }
}
