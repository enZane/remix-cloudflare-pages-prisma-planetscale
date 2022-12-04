import { Link } from "@remix-run/react";

export default function Home() {
  return (
    // home page with tailwindcss
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <header className="flex items-center justify-between w-full px-4 py-8">
        <h1 className="text-2xl font-bold">Remix Auth0</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <a href="https://remix.run">Remix</a>
        </h1>
        <p className="mt-3 text-2xl">
          Get started by editing <code>app/routes/index.tsx</code>
        </p>
      </main>
    </div>
  );
}
