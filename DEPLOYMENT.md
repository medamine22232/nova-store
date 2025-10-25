# Nova Store - Deployment Guide

## Vercel Deployment Setup

### 1. Upload Configuration (Required)

Since Vercel serverless functions don't support local file storage, you need to configure Cloudinary for image uploads:

#### Option A: Unsigned Uploads (Recommended)
```bash
# In your Vercel project environment variables:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

#### Option B: Signed Uploads
```bash
# In your Vercel project environment variables:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Database Configuration (Required)

SQLite doesn't work on Vercel. Switch to a hosted database:

#### Using Supabase (Free tier available)
1. Create a Supabase project at https://supabase.com
2. Get your database URL from Settings > Database
3. Update your Vercel environment variables:
```bash
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
```

#### Using Neon, PlanetScale, or other Postgres providers
Similar process - get the connection string and set `DATABASE_URL`.

### 3. Other Environment Variables

```bash
# Required for production
JWT_SECRET=your-super-secret-jwt-key-for-production
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app

# Telegram (optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### 4. Deploy Commands

```bash
# Build and deploy
npm run build
vercel --prod

# Or connect to GitHub and auto-deploy
vercel --prod
```

### 5. Post-Deployment

1. Run database migrations if using Postgres:
```bash
npx prisma migrate deploy
```

2. Seed initial data if needed:
```bash
npx prisma db seed
```

## Local Development

For local development, the app will automatically:
- Use local file uploads (no Cloudinary needed)
- Use SQLite database (default)
- Use localhost URLs

## Troubleshooting

### Upload Errors on Vercel
- Check that `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_UPLOAD_PRESET` are set in Vercel
- Verify your Cloudinary upload preset allows unsigned uploads
- Check Vercel function logs for detailed error messages

### Database Errors
- Ensure `DATABASE_URL` points to a hosted database (not SQLite)
- Run `npx prisma migrate deploy` after database changes
- Check connection string format and credentials

## Admin Access

- URL: `/admin/login`
- Username: `boubi`  
- Password: `11160893`

## Quick Setup for Cloudinary

1. Sign up at https://cloudinary.com (free tier available)
2. Go to Settings > Upload presets
3. Create a new upload preset with "Unsigned" mode
4. Add the cloud name and upload preset name to your Vercel environment variables
5. Redeploy your Vercel app