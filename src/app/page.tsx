import Link from 'next/link';
import { Calendar, Scissors, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-white/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503951906028-emC7efbc6774?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-zinc-900">
            Más que un corte,<br/>
            <span className="text-amber-600">una experiencia.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-700 mb-10 max-w-2xl mx-auto font-light">
            Especialistas en el arte de la barbería clásica y moderna. 
            Calidad, precisión y estilo en cada detalle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Reservar ahora
            </Link>
            <Link 
              href="/services" 
              className="bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="text-amber-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight text-zinc-900">Maestros Barberos</h3>
            <p className="text-zinc-600 font-light">Técnicas avanzadas y atención personalizada para cada cliente.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-amber-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight text-zinc-900">Calidad Premium</h3>
            <p className="text-zinc-600 font-light">Utilizamos los mejores productos para el cuidado de tu piel y cabello.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-amber-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight text-zinc-900">Citas Rápidas</h3>
            <p className="text-zinc-600 font-light">Sistema de reserva online intuitivo para evitar esperas.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
