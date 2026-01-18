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

<div align="center">
  <p>Built with ❤️ for thinkers everywhere</p>
</div>
