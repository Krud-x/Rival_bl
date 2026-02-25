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

## Step 2: Deploy Backend (Render - Free)

**Render offers free web services:**

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo `Krud-x/Rival_bl`
5. Under "Root Directory", select `backend`
6. Configure:
   - Name: `rival-blog-backend`
   - Environment: `Node`
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `npm run start:prod`

7. Click "Create Web Service"
8. Wait for deployment, then go to "Environment" tab

### Add Environment Variables in Render:
```
DATABASE_URL=postgresql://user:password@host.neon.tech/db?sslmode=require
JWT_SECRET=your-super-secret-key-generate-random-string
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=production
```

9. Copy your backend URL (e.g., `https://rival-blog-backend.onrender.com`)

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
NEXT_PUBLIC_API_URL=https://rival-blog-backend.onrender.com
```
(Replace with your actual Render backend URL)

7. Wait for deployment to complete
8. Copy your frontend URL (e.g., `https://rival-bl.vercel.app`)

---

## Alternative Backend Options

### Option A: Fly.io
1. Go to [Fly.io](https://fly.io)
2. Install `flyctl` CLI
3. Run: `fly launch` in backend folder
4. Follow prompts, add PostgreSQL

### Option B: Cyclic (Easiest)
1. Go to [Cyclic.sh](https://cyclic.sh)
2. Connect GitHub repo
3. Select `backend` folder
4. Add environment variables
5. Deploys automatically

---

## Step 4: Update CORS for Production

After you have both URLs, update the backend.

In Render, add environment variable:
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

Then redeploy.

---

## Step 5: Verify Deployment

Visit your frontend URL and test:
1. Register a new user
2. Create a blog post
3. Publish it
4. Visit the public feed
5. Like and comment

---

## Summary

After deployment, you'll have:
- **Frontend**: https://rival-bl.vercel.app (example)
- **Backend**: https://rival-blog-backend.onrender.com (example)
- **Database**: Neon PostgreSQL

The code is ready at: https://github.com/Krud-x/Rival_bl
