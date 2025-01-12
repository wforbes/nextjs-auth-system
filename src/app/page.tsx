export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Next.js Authentication System</h1>
        <p className="text-lg mb-8">
          A modern, secure authentication system built with Next.js 15, utilizing server actions 
          and JWT tokens. Demonstrates clean implementation of user authentication with 
          type safety and server-side validation.
        </p>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="text-left list-none space-y-2 mx-auto">
              <li>🔐 Secure JWT-based authentication</li>
              <li>🚀 Built with Next.js 15 and Server Actions</li>
              <li>📝 Type-safe form handling with Zod</li>
              <li>🔒 HTTP-only cookie session management</li>
            </ul>
          </div>
          <a
            href="https://github.com/wforbes/nextjs-auth-system"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mt-6"
          >
            View on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
