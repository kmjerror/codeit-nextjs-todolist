import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="font-semibold tracking-tight text-gray-900">
          HOME
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/todolist" className="text-gray-700 hover:underline">
            TODOLIST
          </Link>
          <Link
            href="/new-todo"
            className="rounded bg-black px-3 py-1.5 text-white hover:opacity-90"
          >
            NEW TODO
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;