# Testing Guide for Nova Store Security Features

## 🔐 Authentication Testing

### Admin Login
1. **Access**: `http://localhost:3001/admin/login`
2. **Credentials**:
   - Username: `boubi`
   - Password: `11160893`
3. **Expected**: Successful login and redirect to admin dashboard

### Protected Routes
1. **Try accessing**: `http://localhost:3001/admin` (without login)
2. **Expected**: Automatic redirect to login page
3. **After login**: Full access to admin features

### Logout
1. **Click logout button** in admin header
2. **Expected**: Redirect to login page and session cleared

## 🤖 Bot Protection Testing

### Rate Limiting
1. **Make multiple rapid requests** to any API endpoint
2. **Expected**: 429 "Too many requests" after 10 requests per minute

### Math Verification
1. **Access any product page**: `http://localhost:3001/produit/[id]`
2. **Fill order form** with all required fields
3. **Math question**: Answer correctly to submit
4. **Wrong answer**: Form rejection with error message

### Bot User Agent Detection
1. **Use curl or similar**: 
   ```bash
   curl -H "User-Agent: bot/1.0" http://localhost:3001/api/products
   ```
2. **Expected**: 403 "Access denied"

### Referer Validation
1. **Direct API access** without proper referer
2. **Expected**: 403 "Invalid request source" for order submissions

## 🔒 Secure Bot Credentials

### Environment Protection
1. **Bot credentials**: Only in `.env` file (server-side)
2. **Client inspection**: No bot tokens visible in browser dev tools
3. **API route**: Telegram notifications via `/api/telegram/notify`

### Test Telegram Integration
1. **Place a test order** through the website
2. **Expected**: Telegram notification sent (if bot configured)
3. **No credentials exposed** in client-side code

## ✅ Security Checklist

- [x] Admin panel password protected
- [x] JWT-based authentication
- [x] Session timeout (24 hours)
- [x] Secure logout functionality
- [x] Bot credentials in environment variables
- [x] Rate limiting active
- [x] Bot user agent detection
- [x] Math verification on forms
- [x] Referer validation
- [x] Input validation and sanitization
- [x] Price verification
- [x] Middleware route protection

## 🚨 Monitoring

Check browser console and server logs for:
- Security event logs
- Bot detection messages
- Rate limit violations
- Authentication attempts

## 🛡️ Production Recommendations

1. **Change JWT_SECRET** to a strong random string
2. **Use HTTPS** for all communications
3. **Add CSP headers** for additional security
4. **Regular security audits** and dependency updates
5. **Monitor server logs** for suspicious activity

## Contact

The application is now running on: `http://localhost:3001`
- Public store: `http://localhost:3001`
- Admin login: `http://localhost:3001/admin/login`