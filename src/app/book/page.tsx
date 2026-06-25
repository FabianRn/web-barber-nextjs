"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SERVICES } from '@/lib/constants';
import { Calendar as CalendarIcon, User, Phone, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-zinc-600 font-light">Cargando...</div>
      </main>
    }>
      <BookingForm />
    </Suspense>
  );
}

function BookingForm() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get('service');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: initialServiceId || '',
    date: '',
    time: '',
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Error al reservar");
        setIsSubmitting(false);
        return;
      }

      setIsConfirmed(true);
    } catch {
      alert("Error de conexión. Intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center bg-white border border-zinc-200 p-10 rounded-sm shadow-lg">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-zinc-900">¡Cita Confirmada!</h2>
          <p className="text-zinc-600 mb-8 font-light">
            Gracias {formData.name}, hemos reservado tu espacio para el {formData.date} a las {formData.time}.
          </p>
          <Link 
            href="/" 
            className="block w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-sm font-bold uppercase tracking-widest transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-20 px-6 bg-zinc-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-zinc-900">
            Reserva tu <span className="text-amber-600">Turno</span>
          </h1>
          <p className="text-zinc-600 font-light">Sigue los pasos para asegurar tu espacio.</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden shadow-sm">
          {/* Stepper */}
          <div className="flex border-b border-zinc-200">
            {[1, 2].map((s) => (
              <div 
                key={s} 
                className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest transition-all ${step === s ? 'bg-amber-600 text-white' : 'text-zinc-500 bg-zinc-50'}`}
              >
                Paso {s}: {s === 1 ? 'Servicio y Fecha' : 'Datos Personales'}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {step === 1 ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Selecciona el Servicio
                  </label>
                  <div className="grid gap-3">
                    {SERVICES.map(s => (
                      <label 
                        key={s.id} 
                        className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${formData.serviceId === s.id ? 'border-amber-600 bg-amber-50 text-zinc-900' : 'border-zinc-200 hover:border-zinc-400 text-zinc-600'}`}
                      >
                        <input 
                          type="radio" 
                          name="serviceId" 
                          value={s.id} 
                          checked={formData.serviceId === s.id}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <span className="font-medium">{s.name}</span>
                        <span className="font-bold text-zinc-900">${s.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                      <CalendarIcon className="w-4 h-4" /> Fecha
                    </label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm text-zinc-900 focus:ring-2 focus:ring-amber-600 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                      <Clock className="w-4 h-4" /> Hora
                    </label>
                    <select 
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm text-zinc-900 focus:ring-2 focus:ring-amber-600 outline-none transition-all"
                    >
                      <option value="">Selecciona hora</option>
                      {['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button 
                  type="button"
                  disabled={!formData.serviceId || !formData.date || !formData.time}
                  onClick={() => setStep(2)}
                  className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white py-4 rounded-sm font-bold uppercase tracking-widest transition-all"
                >
                  Siguiente Paso
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    <User className="w-4 h-4" /> Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Juan Pérez"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm text-zinc-900 focus:ring-2 focus:ring-amber-600 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    <Phone className="w-4 h-4" /> Teléfono
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. +123456789"
                    required
                    className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm text-zinc-900 focus:ring-2 focus:ring-amber-600 outline-none transition-all"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 py-4 rounded-sm font-bold uppercase tracking-widest transition-all"
                  >
                    Atrás
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-300 text-white py-4 rounded-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
