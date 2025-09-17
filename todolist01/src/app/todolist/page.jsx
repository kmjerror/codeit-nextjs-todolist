"use client";

import React from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIIC_API_URL || "http://localhost:4000";

export default function TodoListPage() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function loadTodos() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/todos`);
      if (!res.ok) throw new Error("Faileed to fetch");
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      setError("리스트가 없습니다.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadTodos();
  }, []);

  async function toggleComplete(todo) {
    const next = { ...todo, isCompleted: !todo.isCompleted };
    setTodos((cur) => cur.map((t) => (t.id === todo.id ? next : t)));
    try {
      const res = await fetch(`${API}/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: next.isCompleted }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setTodos((cur) => cur.map((t) => (t.id === todo.id ? todo : t)));
    }
  }

  async function removeTodo(id) {
    const prev = todos;
    setTodos((cur) => cur.filter((t) => t.id !== id));
    try {
      const res = await fetch(`${API}/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setTodos(prev);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Todo List</h1>
        <button
          onClick={loadTodos}
          className="rounded border px-3 py-1 text-sm"
        >
          새로고침
        </button>
      </div>

      {loading && <p>불러오는중</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!loading && todos.length === 0 && <p>리스트가 없습니다</p>}

      <ul className="divide-y rounded border">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!todo.isCompleted}
                onChange={() => toggleComplete(todo)}
                aria-label=""
              />
              <Link
                href={`/todolist/${todo.id}`}
                className={`hover:underline ${ todo.isCompleted ? "line-through opacity-60" : ""}`}
              >
                {todo.title}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleComplete(todo)}
                className="text-xs rounded border px-2 py-1"
              >
                {todo.isCompleted ? "완료취소" : "완료"}
              </button>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-xs rounded border px-2 py-1"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}