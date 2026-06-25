import React from 'react';
import Link from 'next/link';
import { Scissors } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white text-zinc-900 border-b border-zinc-200 sticky top-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
        <Scissors className="w-6 h-6 text-amber-600" />
        <span className="text-zinc-900">EL CLUB DEL CORTE</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
        <Link href="/" className="hover:text-amber-600 transition-colors text-zinc-600">Inicio</Link>
        <Link href="/services" className="hover:text-amber-600 transition-colors text-zinc-600">Servicios</Link>
        <Link href="/book" className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-sm transition-colors">
          Reservar Cita
        </Link>
      </div>
    </nav>
  );
}
