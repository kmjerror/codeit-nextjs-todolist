import React from "react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-5xl px-5 py-6 text-xs text-gray-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:jutify-between">
        <p>© {new Date().getFullYear()} Todo App</p>
        <p className="opacity-80">
          API: <code className="font-mono">{process.env.NEXT_PUBLIC_API_URL}</code>
        </p>
      </div>
    </footer>
  );
}