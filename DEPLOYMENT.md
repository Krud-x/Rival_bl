# Deployment Guide - Rival Blog Platform

## Fix for Render Deployment

The error was because the TypeScript wasn't being compiled. I've added a webpack config to fix this.

### Render Build Settings:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `node dist/main.js`

---

## Step 1: Create Database (Neon - Free PostgreSQL)

1. Go to [Neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Click "Create Project"
4. Name: `rival-blog`
5. Copy the connection string

---

## Step 2: Deploy Backend (Render)

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo `Krud-x/Rival_bl`
5. Root Directory: `backend`
6. Configure:
   - Name: `rival-blog-backend`
   - Environment: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/main.js`

7. Add Environment Variables:
   - `DATABASE_URL` = your Neon connection string
   - `JWT_SECRET` = generate a random string
   - `JWT_EXPIRES_IN` = 7d
   - `PORT` = 3001
   - `NODE_ENV` = production

8. Deploy!

---

## Step 3: Deploy Frontend (Vercel)

1. Go to [Vercel.com](https://vercel.com)
2. Import `Krud-x/Rival_bl`
3. Root Directory: `frontend`
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL
5. Deploy

---

## Step 4: Update CORS

In Render, add:
- `CORS_ORIGIN` = your Vercel frontend URL

---

## GitHub: https://github.com/Krud-x/Rival_bl
