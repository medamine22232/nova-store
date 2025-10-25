# 🚀 Vercel Deployment Guide - Nova Store

## 📋 Deployment Checklist

### ✅ Prerequisites Completed
- [x] MongoDB schema updated for ObjectId
- [x] Prisma configuration ready
- [x] Upload system with Cloudinary support
- [x] Admin authentication system
- [x] Code pushed to GitHub repository

## 🔧 Environment Variables for Vercel

When deploying to Vercel, add these environment variables in your Vercel Dashboard:

### Database Configuration
```bash
DATABASE_URL=mongodb+srv://livarte9_db_user:IIqqUTOqQ7dqSCfG@YOUR_CLUSTER_URL/nova-store?retryWrites=true&w=majority
```

**Important**: Replace `YOUR_CLUSTER_URL` with your actual MongoDB Atlas cluster URL. Get this from your Atlas dashboard:
1. Go to MongoDB Atlas Dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>` with `livarte9_db_user`
6. Replace `<password>` with `IIqqUTOqQ7dqSCfG`
7. Replace `<database>` with `nova-store`

### Application Configuration
```bash
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

### Authentication
```bash
JWT_SECRET=nova-store-jwt-secret-change-this-in-production-2025
```

### Telegram Bot (Optional)
```bash
TELEGRAM_BOT_TOKEN=7489339186:AAEgTUwyI_ayQsqrRFNnl5EqRvG0WSMUdwU
TELEGRAM_CHAT_ID=-4809800938
```

### Cloudinary (Required for Image Uploads)
```bash
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

**Get Cloudinary credentials**:
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

## 📱 Step-by-Step Deployment

### 1. Deploy to Vercel

#### Option A: From GitHub (Recommended)
1. Push your code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your `nova-store` repository
5. Configure environment variables (see above)
6. Click "Deploy"

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 2. Configure MongoDB Atlas for Vercel

1. **Whitelist Vercel IPs**:
   - In Atlas, go to Network Access
   - Add IP: `0.0.0.0/0` (allows all IPs)
   - For production, use specific Vercel IPs

2. **Get Connection String**:
   - Go to Database > Connect
   - Choose "Connect your application"
   - Copy the string and add to Vercel env vars

### 3. Set Up Cloudinary

1. **Create account**: [cloudinary.com](https://cloudinary.com)
2. **Get credentials**: Dashboard > Account Details
3. **Add to Vercel**: Environment Variables section

### 4. Test Deployment

1. **Visit your app**: `https://your-app-name.vercel.app`
2. **Test admin panel**: `https://your-app-name.vercel.app/admin`
   - Username: `boubi`
   - Password: `11160893`
3. **Test product creation**: Add a product with image upload
4. **Test ordering**: Place a test order

## 🐛 Common Issues & Solutions

### Issue: Database Connection Failed
```
Error: MongoDB connection failed
```
**Solutions**:
1. Check DATABASE_URL format
2. Verify MongoDB Atlas allows connections from `0.0.0.0/0`
3. Ensure username/password are correct
4. Check if cluster is paused (free tier auto-pauses)

### Issue: Image Upload Failed
```
Error: Failed to upload image
```
**Solutions**:
1. Add Cloudinary environment variables
2. Check Cloudinary account is active
3. Verify API credentials are correct

### Issue: Admin Login Not Working
```
Error: Authentication failed
```
**Solutions**:
1. Check JWT_SECRET is set
2. Clear browser cookies
3. Try incognito mode

### Issue: Build Failed
```
Error: Command "npm run build" exited with 1
```
**Solutions**:
1. Check for TypeScript errors
2. Ensure all environment variables are set
3. Check Prisma schema syntax

## 📊 Production Optimizations

### Performance
- [x] Next.js API routes optimized
- [x] MongoDB indexes configured
- [x] Image optimization with Cloudinary
- [x] Static generation where possible

### Security
- [x] Environment variables secured
- [x] JWT authentication
- [x] Admin routes protected
- [x] Input validation

### Monitoring
After deployment, monitor:
- **Vercel Analytics**: Function execution times
- **MongoDB Atlas**: Database performance
- **Cloudinary**: Image delivery metrics

## 🌍 Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" > "Domains"
   - Add your custom domain

2. **Update Environment Variables**:
   ```bash
   NEXT_PUBLIC_APP_URL=https://your-custom-domain.com
   ```

## 🔄 Future Updates

To update your deployed app:
1. Make changes locally
2. Push to GitHub: `git push origin main`
3. Vercel auto-deploys from main branch

## 📞 Support Resources

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Cloudinary**: [cloudinary.com/documentation](https://cloudinary.com/documentation)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] MongoDB Atlas cluster is created and accessible
- [ ] Cloudinary account is set up
- [ ] All environment variables are configured in Vercel
- [ ] Code is pushed to GitHub
- [ ] Local testing with MongoDB connection works

**Your app is ready for production! 🚀**