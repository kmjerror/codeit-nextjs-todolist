"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function genId() {
  return Math.random().toString(16).slice(2, 6);
}

export default function NewTodoPage() {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("제목을 입력해주세요");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          id: genId(),
          title: trimmed,
          isCompleted: false,
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("failed");

      router.push("/todolist");
      router.refersh();
    } catch {
      setError();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Todo 추가</h1>

      <form onSubmit={onSubmit} className="space-y-3 max-w-md">
        <label className="block">
          <span className="text-sm">제목</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder=""
            autoFocus
            required
          />
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded border px-4 py-2 text-sm disabled:opacity-50"
          >
            {submitting ? "저장중" : "추가"}
          </button>
          <Link href="/todolist" className="rounded border px-4 py-2 text-sm">목록</Link>
        </div>
      </form>
    </section>
  );
}