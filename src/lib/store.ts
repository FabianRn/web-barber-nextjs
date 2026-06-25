import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

export type Booking = {
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

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // exists
  }
}

async function readBookings(): Promise<Booking[]> {
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeBookings(bookings: Booking[]) {
  await ensureDataDir();
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export async function getBookings(): Promise<Booking[]> {
  return readBookings();
}

export async function createBooking(data: Omit<Booking, "id" | "createdAt" | "status">): Promise<Booking> {
  const bookings = await readBookings();
  const booking: Booking = {
    ...data,
    id: `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  await writeBookings(bookings);
  return booking;
}

export async function updateBookingStatus(id: string, status: Booking["status"]): Promise<Booking | null> {
  const bookings = await readBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index].status = status;
  await writeBookings(bookings);
  return bookings[index];
}
