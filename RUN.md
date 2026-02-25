# How to Run the Rival Blog Platform on Your Local Laptop

## Prerequisites
1. **Node.js** (v18+) - Download from https://nodejs.org/
2. **PostgreSQL** - Download from https://www.postgresql.org/download/ OR use Supabase

---

## Step 1: Set Up PostgreSQL Database

1. Install PostgreSQL on your laptop
2. Create a new database named `rival_blog`
3. Copy your connection string (e.g., `postgresql://postgres:password@localhost:5432/rival_blog`)

---

## Step 2: Configure Backend

Edit file: `d:/Rival_bl/backend/.env`

Update DATABASE_URL with your PostgreSQL connection:

For JWT_SECRET, you can use any random string (at least 32 characters). Here are some easy ways to generate one:

**Option 1:** Use this ready-made key (for development only):
```
JWT_SECRET="rival-blog-secret-key-12345678901234"
```

**Option 2:** Generate your own:
```
bash
# Run this in terminal to generate a random key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Full .env file:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/rival_blog?schema=public"
JWT_SECRET="rival-blog-secret-key-12345678901234"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
```

**Note:** For production, generate a more secure random key using Option 2 above.

---

## Step 3: Run Backend

Open terminal and run:
```
bash
cd d:/Rival_bl/backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

Backend runs at: **http://localhost:3001**

---

## Step 4: Run Frontend

Open a NEW terminal and run:
```
bash
cd d:/Rival_bl/frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**

---

## Step 5: Use the Application

1. Open http://localhost:3000 in your browser
2. Click **Register** to create an account
3. After login, go to **Dashboard** to create blogs
4. Publish a blog to see it in the **Feed**

---

## Quick Commands Reference

| Task | Command | Location |
|------|---------|----------|
| Start backend | `npm run start:dev` | backend/ |
| Start frontend | `npm run dev` | frontend/ |
| View database | `npx prisma studio` | backend/ |
| Reset database | `npx prisma migrate reset` | backend/ |

---

## Troubleshooting

**Port already in use?** 
- Change PORT in backend/.env to 3002

**Database connection error?**
- Make sure PostgreSQL is running
- Check DATABASE_URL is correct

**Dependencies missing?**
- Run `npm install` in both backend/ and frontend/ directories
