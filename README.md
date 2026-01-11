# LingoLearn Web

A modern, cross-platform vocabulary learning application built with Next.js 14 and Supabase.

## ✨ Features

- 📚 **3D Flashcards** - Interactive word cards with flip animations
- 🧠 **SM-2 Algorithm** - Optimized spaced repetition for retention
- 🎯 **Multiple Practice Modes** - Choice, fill-in-the-blank, and listening quizzes
- 📊 **Progress Tracking** - Visual charts and statistics
- 🔊 **Text-to-Speech** - Native pronunciation using Web Speech API
- 🌙 **Dark Mode** - Modern, eye-friendly design
- 📱 **PWA Ready** - Install on any device

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase OAuth (GitHub, Google)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm
- Supabase account

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations in Supabase SQL Editor
# (see supabase/migrations/001_initial_schema.sql)

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (dashboard)/      # Main application pages
│   ├── auth/             # OAuth callback
│   └── login/            # Login page
├── components/           # React components
│   ├── auth/             # Authentication
│   ├── practice/         # Quiz components
│   ├── progress/         # Charts and stats
│   ├── study/            # Word cards
│   └── ui/               # Reusable UI
├── hooks/                # Custom React hooks
└── lib/                  # Utilities and algorithms
    ├── algorithms/       # SM-2 implementation
    ├── supabase/         # Supabase clients
    └── utils/            # Helper functions
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Supabase Configuration

After deployment, update your Supabase project:
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

## 📝 License

MIT
