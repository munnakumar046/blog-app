"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = !isPending && !!session;

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          My Blog App
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              {/* These links now ONLY show when logged in */}
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/blogs">Blogs</Link>
              <Link
                href="/create-blog"
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Create Blog
              </Link>
              {session?.user?.name && (
                <span className="text-xs text-blue-200 font-light border-l border-blue-400 pl-3">
                  Hi, {session.user.name}
                </span>
              )}
              <LogoutButton />
            </>
          ) : (
            <>
              {/* Only show these when logged out */}
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden cursor-pointer text-xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden bg-blue-700 flex flex-col space-y-2 p-4">
          {isLoggedIn ? (
            <>
              {/* Mobile links ONLY show when logged in */}
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="/blogs" onClick={() => setOpen(false)}>
                Blogs
              </Link>
              <Link href="/create-blog" onClick={() => setOpen(false)}>
                Create Blog
              </Link>
              <div className="pt-2 border-t border-blue-600">
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              {/* Mobile links ONLY show when logged out */}
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
