"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin;

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-semibold text-lg tracking-tight">
          refalo<span className="text-indigo-400">.io</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <Link href="/categories" className="hover:text-white transition-colors">
            Browse
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              {isAdmin && (
                <Link href="/admin" className="hover:text-white transition-colors text-indigo-400">
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="hover:text-white transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-white transition-colors">
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
