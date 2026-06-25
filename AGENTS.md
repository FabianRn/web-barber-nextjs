# Agents Guide - Web Barber Nextjs

## Project Overview
A high-end barber shop website built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Utilities**: `clsx`, `tailwind-merge`

## Project Structure
- `src/app/`: Page routes and layouts.
- `src/components/`: UI components (Navbar, etc.).
- `src/lib/`: Business logic, constants, and utility functions.
- `public/`: Static assets.

## Critical Conventions
- **Aliases**: Use `@/` for absolute imports starting from `src/`.
- **Styling**: Strictly use Tailwind CSS utility classes. Follow the "Modern Classic" palette (Zinc-50 background, Amber-600 accents).
- **Client Components**: Use `"use client"` directive at the top of files utilizing hooks (`useState`, `useEffect`) or browser APIs.

## Developer Commands
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
