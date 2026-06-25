"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Scissors } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="flex-1 flex items-center justify-center px-6 bg-zinc-50">
        <div className="text-zinc-600 font-light">Cargando...</div>
      </main>
    }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      router.push(redirectTo);
    } catch {
      setError("Error de conexión");
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center px-6 bg-zinc-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-2xl font-black tracking-tighter mb-2">
            <Scissors className="w-6 h-6 text-amber-600" />
            <span className="text-zinc-900">EL CLUB DEL CORTE</span>
          </div>
          <p className="text-zinc-500 text-sm font-light">Acceso al panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-sm p-8 shadow-sm">
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              required
              autoFocus
              className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm text-zinc-900 focus:ring-2 focus:ring-amber-600 outline-none transition-all"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white py-3 rounded-sm font-bold uppercase tracking-widest transition-all"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}
