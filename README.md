# DearDiary

A modern, feature-rich blog and diary application built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Authentication & User Profiles**: Secure authentication powered by Supabase Auth with custom user profiles.
- **Role-Based Access Control**: Granular permissions for Admins and standard Users.
- **Content Management**:
  - create, edit, and delete posts (Admin).
  - Categorize posts with custom categories.
  - Featured images and rich text support.
  - Draft/Publish workflows.
- **Interactive Comments**: Threaded comment system allowing users to engage with posts.
- **Media Management**: Centralized media handling.
- **Modern UI/UX**:
  - Responsive design using **Tailwind CSS v4**.
  - Accessible components via **Shadcn UI**.
  - Smooth animations and transitions.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Components**: Shadcn UI (Radix Primitives)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Requirements

Before you begin, ensure you have the following:

- **Node.js**: Version 18 or higher.
- **Supabase Project**: Create a new project at [database.new](https://database.new/).

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd deardiary
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables. You can use `example.env` as a template:

```bash
cp example.env .env.local
```

Fill in the following details:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### 4. Database Setup

1. Go to your Supabase project dashboard.
2. Navigate to the **SQL Editor**.
3. Copy the contents of `schema.sql` from this project.
4. Paste it into the SQL Editor and run it. This will create all necessary tables, policies, and triggers.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
