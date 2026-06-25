import { SERVICES } from "@/lib/constants";
import Link from "next/link";
import { Check } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="flex-1 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-zinc-900">
            Nuestros <span className="text-amber-600">Servicios</span>
          </h1>
          <p className="text-zinc-600 max-w-2xl mx-auto font-light">
            Desde el corte más clásico hasta los estilos más modernos, 
            tenemos el servicio perfecto para renovar tu imagen.
          </p>
        </div>

        <div className="grid gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white border border-zinc-200 p-6 rounded-sm hover:border-amber-600 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md"
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  <Check className="text-amber-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-900 group-hover:text-amber-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-zinc-600 font-light">{service.description}</p>
                  <div className="flex gap-4 mt-2 text-xs font-medium text-zinc-500 uppercase tracking-widest">
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-black text-zinc-900">${service.price}</span>
                <Link 
                  href={`/book?service=${service.id}`} 
                  className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Reservar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
