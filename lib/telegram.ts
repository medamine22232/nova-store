export async function sendTelegramNotification(order: any) {
  try {
    // Use internal API route to send notification securely
    // This prevents exposing bot credentials to the client side
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/telegram/notify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    if (!response.ok) {
      console.error("Failed to send Telegram notification via API");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
}
