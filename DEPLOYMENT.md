# 🚀 Deployment Guide - Rival Blog Platform

This guide will help you deploy your blog platform to live servers.

---

## Step 1: Create Database (Neon - Free PostgreSQL)

1. Go to [Neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Click "Create Project"
4. Name: `rival-blog`
5. Copy the connection string (format: `postgresql://user:password@host.neon.tech/db?sslmode=require`)

---

## Step 2: Deploy Backend (Railway - Free)

### Option A: Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `Krud-x/Rival_bl`
6. Under "Root Directory", select `backend`
7. Click "Deploy"

### Configure Environment Variables in Railway:
After deployment, go to the "Variables" tab and add:
```
DATABASE_URL=postgresql://user:password@host.neon.tech/db?sslmode=require
JWT_SECRET=your-super-secret-key-generate-random-string
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=production
```

8. Wait for deployment to complete
9. Copy your backend URL (e.g., `https://rival-blog-backend.up.railway.app`)

---

## Step 3: Deploy Frontend (Vercel - Free)

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import `Krud-x/Rival_bl`
5. Under "Root Directory", select `frontend`
6. Click "Deploy"

### Configure Environment Variables in Vercel:
After deployment, go to Settings → Environment Variables and add:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app
```
(Replace with your actual Railway backend URL)

7. Wait for deployment to complete
8. Copy your frontend URL (e.g., `https://rival-bl.vercel.app`)

---

## Step 4: Update CORS for Production

After you have both URLs, you need to update the backend to allow your frontend.

In Railway, add this environment variable:
```
CORS_ORIGIN=https://your-frontend.vercel.app
```

Or manually update in `backend/src/main.ts`:
```
typescript
app.enableCors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true,
});
```

Then redeploy the backend.

---

## Step 5: Verify Deployment

Visit your frontend URL and test:
1. Register a new user
2. Create a blog post
3. Publish it
4. Visit the public feed
5. Like and comment

---

## Troubleshooting

### Common Issues:
1. **CORS Error**: Ensure CORS_ORIGIN matches your frontend URL exactly
2. **Database Connection**: Check DATABASE_URL is correct
3. **Build Failures**: Check Railway/Vercel logs for errors

### Check Logs:
- Railway: Dashboard → Deploy → View Logs
- Vercel: Dashboard → Deployments → View Logs

---

## Summary

After deployment, you'll have:
- **Frontend**: https://rival-bl.vercel.app (example)
- **Backend**: https://rival-blog-backend.up.railway.app (example)
- **Database**: Neon PostgreSQL

The code is ready at: https://github.com/Krud-x/Rival_bl
