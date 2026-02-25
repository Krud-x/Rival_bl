# Secure Blog Platform - Technical Specification

## Project Overview
- **Project Name**: Rival Blog Platform
- **Type**: Full-stack Web Application (Blog Platform)
- **Core Functionality**: A production-ready blog platform with public/private access, authentication, like & comment system
- **Target Users**: Content creators, bloggers, and readers

## Tech Stack

### Backend
- NestJS (latest stable)
- TypeScript (strict mode)
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt password hashing
- BullMQ + Redis (async jobs - bonus)
- Pino (structured logging)
- Express-rate-limit (rate limiting)

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Clean architecture
- React Query for data fetching
- JWT authentication flow

## Architecture

### Backend Structure
```
backend/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   └── auth.service.ts
│   ├── blogs/
│   │   ├── dto/
│   │   ├── blogs.controller.ts
│   │   ├── blogs.service.ts
│   │   └── blogs.module.ts
│   ├── likes/
│   ├── comments/
│   ├── public/
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   └── interceptors/
│   ├── prisma/
│   └── main.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   └── blogs/
│   │   ├── (public)/
│   │   │   ├── feed/
│   │   │   └── blog/
│   │   ├── api/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── blogs/
│   │   └── comments/
│   ├── lib/
│   │   ├── api/
│   │   ├── auth/
│   │   └── utils/
│   └── types/
├── package.json
└── tsconfig.json
```

## Database Schema (Prisma)

### User Model
```
prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  name         String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  blogs        Blog[]
  likes        Like[]
  comments     Comment[]
}
```

### Blog Model
```
prisma
model Blog {
  id          String    @id @default(uuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  title       String
  slug        String    @unique
  content     String
  summary     String?
  isPublished Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  likes       Like[]
  comments    Comment[]
}
```

### Like Model
```
prisma
model Like {
  id        String   @id @default(uuid())
  userId    String
  blogId    String
  user      User     @relation(fields: [userId], references: [id])
  blog      Blog     @relation(fields: [blogId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, blogId])
}
```

### Comment Model
```
prisma
model Comment {
  id        String   @id @default(uuid())
  content   String
  userId    String
  blogId    String
  user      User     @relation(fields: [userId], references: [id])
  blog      Blog     @relation(fields: [blogId], references: [id])
  createdAt DateTime @default(now())

  @@index([blogId])
  @@index([createdAt])
}
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile (protected)

### Blog Management (Private)
- `POST /blogs` - Create blog
- `GET /blogs` - List user's blogs
- `GET /blogs/:id` - Get blog by ID
- `PATCH /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

### Public Access
- `GET /public/feed` - Get paginated published blogs
- `GET /public/blogs/:slug` - Get single published blog

### Likes (Protected)
- `POST /blogs/:id/like` - Like a blog
- `DELETE /blogs/:id/like` - Unlike a blog

### Comments (Protected)
- `POST /blogs/:id/comments` - Add comment
- `GET /blogs/:id/comments` - Get blog comments

## Acceptance Criteria

### Authentication
- [x] Users can register with email/password
- [x] Users can login and receive JWT
- [x] Protected routes require valid JWT
- [x] Passwords are hashed with bcrypt
- [x] DTO validation on all inputs

### Blog Management
- [x] Authenticated users can create blogs
- [x] Only owners can edit/delete their blogs
- [x] Slug is auto-generated and unique
- [x] Published blogs are publicly accessible

### Public Feed
- [x] Paginated list of published blogs
- [x] Includes author info, like count, comment count
- [x] Sorted by newest first
- [x] No N+1 queries

### Like System
- [x] Users can like/unlike blogs
- [x] Unique constraint prevents duplicates
- [x] Returns updated like count

### Comment System
- [x] Users can add comments
- [x] Comments include author info
- [x] Sorted by newest first

### Frontend
- [x] Clean folder structure
- [x] Reusable components
- [x] Proper authentication flow
- [x] Protected routes
- [x] Loading & error states
- [x] Responsive design

### Security
- [x] Password hashing
- [x] JWT validation
- [x] Input validation
- [x] Proper status codes
- [x] No sensitive data exposure
