import { NextResponse } from "next/server";
import { getBookings, createBooking } from "@/lib/store";
import { SERVICES } from "@/lib/constants";

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { serviceId, date, time, name, phone } = body;

  if (!serviceId || !date || !time || !name || !phone) {
    return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }

  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) {
    return NextResponse.json({ error: "Servicio no válido" }, { status: 400 });
  }

  const booking = await createBooking({
    serviceId,
    serviceName: service.name,
    date,
    time,
    name,
    phone,
  });

  return NextResponse.json(booking, { status: 201 });
}
