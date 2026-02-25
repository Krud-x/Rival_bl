# Rival Blog Platform

A production-ready blog platform with authentication, private dashboard, public blog URLs, and social features.

## 🚀 Features

### Authentication System
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with guards

### Blog Management
- Create, read, update, delete blogs
- Publish/unpublish functionality
- Auto-generated unique slugs
- Owner-only editing

### Public Features
- Public feed with pagination
- Individual blog pages
- Like system (authenticated users)
- Comment system (authenticated users)

### Technical Highlights
- Clean architecture (backend & frontend)
- Prisma ORM with PostgreSQL
- TypeScript strict mode
- Rate limiting
- Structured logging

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```
bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

```
bash
# Create a PostgreSQL database
# Update the DATABASE_URL in backend/.env

# Generate Prisma client
cd backend
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio
npx prisma studio
```

### 3. Environment Variables

Create `.env` file in backend directory:

```
env
DATABASE_URL="postgresql://user:password@localhost:5432/rival_blog?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
```

Create `.env.local` file in frontend directory:

```
env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Run the Application

```
bash
# Start backend (from backend directory)
npm run start:dev

# Start frontend (from frontend directory)
npm run dev
```

## 📁 Project Structure

```
rival-blog/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── blogs/           # Blog CRUD operations
│   │   ├── public/          # Public endpoints
│   │   ├── likes/           # Like functionality
│   │   ├── comments/        # Comment functionality
│   │   ├── prisma/          # Database service
│   │   └── common/          # Shared utilities
│   └── prisma/
│       └── schema.prisma    # Database schema
│
├── frontend/                # Next.js 15 App
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # Reusable components
│   │   ├── lib/           # API clients, utils
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
│
└── README.md
```

##  API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user (protected)

### Blogs (Protected)
- `POST /blogs` - Create blog
- `GET /blogs` - List user's blogs
- `GET /blogs/:id` - Get blog by ID
- `PATCH /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

### Public
- `GET /public/feed` - Paginated public feed
- `GET /public/blogs/:slug` - Get published blog

### Likes (Protected)
- `POST /blogs/:id/like` - Like a blog
- `DELETE /blogs/:id/like` - Unlike a blog

### Comments (Protected)
- `POST /blogs/:id/comments` - Add comment
- `GET /blogs/:id/comments` - Get comments

## 🖥️ Frontend Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/feed` - Public feed
- `/blog/[slug]` - Public blog page
- `/dashboard` - Private dashboard
- `/dashboard/blogs` - Manage blogs
- `/dashboard/blogs/[id]` - Edit blog

## 🔐 Security

- Passwords hashed with bcrypt
- JWT token authentication
- Input validation with class-validator
- Protected route guards
- SQL injection prevention via Prisma

## 📦 Tech Stack

### Backend
- NestJS 10
- TypeScript (strict)
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Express Rate Limit

### Frontend
- Next.js 15
- TypeScript
- React Context for Auth
- Tailwind CSS

## 🔧 Tradeoffs Made

1. **Simplified Authentication**: Used basic JWT without refresh tokens for simplicity
2. **No Redis**: Skipped Redis for async jobs in favor of synchronous processing
3. **Basic Rate Limiting**: Used express-rate-limit instead of more complex solutions
4. **No Image Upload**: Skipped file upload functionality
5. **No Email Verification**: Simplified registration flow

## 💡 Future Improvements

1. **Refresh Tokens**: Implement token rotation for better security
2. **Role-based Access**: Add admin/user roles
3. **Async Jobs**: Implement BullMQ for background processing
4. **Image Upload**: Add media upload functionality
5. **Search**: Full-text search for blogs
6. **Notifications**: Email/push notifications
7. **Social Auth**: Google/GitHub OAuth

## 📈 Scaling to 1M Users

1. **Database**: Implement read replicas and sharding
2. **Caching**: Add Redis for frequently accessed data
3. **CDN**: Use CDN for static assets
4. **Microservices**: Split into microservices架构
5. **Queue**: Implement message queues for async tasks
6. **Monitoring**: Add APM tools (Datadog, New Relic)

## 📄 License

MIT
