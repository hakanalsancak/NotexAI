# NotexAI - AI-Powered Note Taking

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai" alt="OpenAI">
</div>

<br>

A beautiful, professional note-taking application with AI-powered enhancement capabilities. Built with Next.js 14, PostgreSQL, and OpenAI.

## ✨ Features

- **🔐 Secure Authentication** - Email/password authentication with NextAuth.js
- **📝 Rich Text Editor** - Beautiful editor with formatting, lists, code blocks, and more
- **🤖 AI Enhancement** - Transform your notes with GPT-4o powered improvements:
  - Improve writing quality and grammar
  - Summarize long content
  - Expand ideas with more detail
  - Convert to professional tone
- **📁 Organization** - Folders, pinning, and archiving for perfect organization
- **🔍 Search** - Instant search across all your notes
- **🎨 Stunning UI** - Glassmorphism design with smooth animations
- **📱 Responsive** - Works beautifully on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd notex-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/notexai"
   AUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32
   AUTH_URL="http://localhost:3000"
   OPENAI_API_KEY="sk-your-openai-api-key"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

```bash
# Create database
createdb notexai

# Or using psql
psql -U postgres -c "CREATE DATABASE notexai;"
```

### Option 2: Docker

```bash
docker run --name notexai-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=notexai -p 5432:5432 -d postgres:15
```

### Option 3: Cloud Database

Use services like:
- [Neon](https://neon.tech) (Free tier available)
- [Supabase](https://supabase.com) (Free tier available)
- [Railway](https://railway.app)
- [PlanetScale](https://planetscale.com)

## 🤖 AI Configuration

To enable AI-powered note enhancement:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to your `.env.local`:
   ```env
   OPENAI_API_KEY="sk-your-api-key-here"
   ```

The AI enhancement feature supports:
- **Improve Writing** - Fix grammar, enhance clarity and flow
- **Summarize** - Create concise summaries
- **Expand Ideas** - Elaborate with more detail
- **Make Professional** - Convert to formal business tone

## 📁 Project Structure

```
notex-ai/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   │   ├── ai/            # AI enhancement endpoint
│   │   └── auth/          # NextAuth.js handlers
│   └── dashboard/         # Protected dashboard pages
├── components/            # React components
│   ├── dashboard/         # Dashboard UI components
│   └── editor/            # Rich text editor components
├── lib/                   # Utilities and server actions
├── prisma/               # Database schema
└── types/                # TypeScript type definitions
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Authentication | NextAuth.js v5 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Rich Text | TipTap Editor |
| AI | OpenAI GPT-4o-mini |
| Icons | Lucide React |

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `AUTH_SECRET` | NextAuth.js secret key | ✅ |
| `AUTH_URL` | Application URL | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ❌ (for AI features) |

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
- `midnight` - Primary dark colors
- `amber` - Accent colors
- `coral` - Error/danger colors

### Fonts
The app uses:
- **Playfair Display** - Headings
- **DM Sans** - Body text
- **JetBrains Mono** - Code blocks

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

<div align="center">
  <p>Built with ❤️ for thinkers everywhere</p>
</div>
