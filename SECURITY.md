# Security Configuration for Nova Store

## Bot Protection Features Implemented

### 1. Admin Panel Authentication
- **Username**: boubi
- **Password**: 11160893 (hashed using bcrypt)
- **JWT-based sessions** with 24-hour expiry
- **Protected routes** via middleware
- **Logout functionality** with secure cookie clearing

### 2. Bot Credentials Security
- **Telegram bot token and chat ID** moved to environment variables
- **Server-side only access** - credentials never exposed to client
- **Secure API route** for Telegram notifications
- **Environment file protection** (.env added to .gitignore)

### 3. Rate Limiting & Bot Detection
- **Rate limiting**: 10 requests per minute per IP/user agent
- **Bot detection**: Automatic blocking of common bot user agents
- **Referer validation**: API requests must come from valid sources
- **Client identification**: IP + user agent combination tracking

### 4. Form Protection
- **Math verification**: Simple CAPTCHA-like protection on order forms
- **Input validation**: Server-side verification of all form data
- **Realistic limits**: Quantity limits and data validation
- **Price verification**: Server-side total price calculation check

### 5. Additional Security Measures
- **Middleware protection**: Routes are protected at the middleware level
- **Memory cleanup**: Rate limiter automatically cleans expired entries
- **Error logging**: Suspicious activities are logged for monitoring

## Environment Variables Required

```bash
# Database
DATABASE_URL="file:./dev.db"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Telegram Bot Configuration (KEEP SECRET!)
TELEGRAM_BOT_TOKEN="your_bot_token_here"
TELEGRAM_CHAT_ID="your_chat_id_here"

# Admin Authentication
JWT_SECRET="your-super-secret-jwt-key"
```

## Security Best Practices

1. **Never commit .env files** to version control
2. **Change JWT_SECRET** in production
3. **Use HTTPS** in production
4. **Monitor logs** for suspicious activity
5. **Regular security updates** for all dependencies

## Admin Access

- **URL**: `/admin/login`
- **Username**: boubi
- **Password**: 11160893

## Bot Protection Features Active

✅ Password-protected admin panel
✅ Secure bot credentials (server-side only)
✅ Rate limiting (10 req/min per client)
✅ Bot user agent detection
✅ Math verification on forms
✅ Referer validation
✅ Input sanitization
✅ Price verification
✅ Session management

## Monitoring

The system logs the following security events:
- Bot detection attempts
- Rate limit violations
- Invalid referer attempts
- Failed login attempts
- Suspicious form submissions