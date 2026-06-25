"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    fetch("/api/bookings")
      .then((res) => {
        if (res.status === 401) window.location.href = "/admin/login";
        return res.json();
      })
      .then((data) => {
        if (!data.error) setBookings(data);
      })
      .catch(() => console.error("Error fetching bookings"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }

    loadBookings();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-800 border-amber-300";
      case "confirmed": return "bg-green-100 text-green-800 border-green-300";
      case "cancelled": return "bg-red-100 text-red-800 border-red-300";
    }
  };

  const getStatusText = (status: Booking["status"]) => {
    switch (status) {
      case "pending": return "Pendiente";
      case "confirmed": return "Confirmada";
      case "cancelled": return "Cancelada";
    }
  };

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <main className="flex-1 py-16 px-6 bg-zinc-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
              Panel de <span className="text-amber-600">Reservas</span>
            </h1>
            <p className="text-zinc-500 font-light text-sm mt-1">
              {pendingCount > 0
                ? `Tienes ${pendingCount} reserva${pendingCount > 1 ? "s" : ""} pendiente${pendingCount > 1 ? "s" : ""} de validar.`
                : "Todas las reservas están gestionadas."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Volver al inicio
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-400 font-light">Cargando reservas...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white border border-zinc-200 rounded-sm">
            <p className="text-zinc-500 font-light">No hay reservas registradas.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-zinc-200 rounded-sm text-left">
              <thead className="bg-zinc-100 border-b border-zinc-200">
                <tr className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                  <th className="p-4">Estado</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Teléfono</th>
                  <th className="p-4">Servicio</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Hora</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(b.status)}`}>
                        {getStatusText(b.status)}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-zinc-900">{b.name}</td>
                    <td className="p-4 text-zinc-600">{b.phone}</td>
                    <td className="p-4 text-zinc-600">{b.serviceName}</td>
                    <td className="p-4 text-zinc-600">{b.date}</td>
                    <td className="p-4 text-zinc-600">{b.time}</td>
                    <td className="p-4">
                      {b.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(b.id, "confirmed")}
                            className="text-xs font-bold uppercase tracking-widest bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-sm transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, "cancelled")}
                            className="text-xs font-bold uppercase tracking-widest bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-sm transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                      {b.status !== "pending" && (
                        <span className="text-xs text-zinc-400 italic">
                          {b.status === "confirmed" ? "✓ Confirmada" : "✗ Cancelada"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
