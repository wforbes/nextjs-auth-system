# Next.js Authentication System

A modern, secure authentication system built with Next.js 15, utilizing server actions and JWT tokens via the `jose` package. This project demonstrates a clean implementation of user authentication with type safety and server-side validation.

## Features

- 🔐 Secure JWT-based authentication
- 🚀 Built with Next.js 15 and Server Actions
- 📝 Type-safe form handling with Zod validation
- 🎨 Modern UI with Tailwind CSS
- 🔒 HTTP-only cookie session management
- ⚡ Fast page transitions with Next.js App Router

## Tech Stack

- **Framework**: Next.js 15
- **Authentication**: JWT (jose)
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-auth-system.git
cd nextjs-auth-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your session secret to `.env`:
```
SESSION_SECRET=your_secure_secret_here
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

- `/src/app/login` - Login page and authentication logic
- `/src/app/dashboard` - Protected dashboard route
- `/src/app/lib/session.ts` - JWT session management
- `/src/middleware.ts` - Route protection middleware

## Security Features

- HTTP-only cookies for session storage
- Server-side validation
- Secure password handling
- Protected routes with middleware
- Type-safe implementations

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## License

MIT
