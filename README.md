# 💇‍♂️ Web Barber Next.js

Una moderna y elegante web para una barbería de alta gama construida con Next.js 15+, TypeScript y Tailwind CSS.

## ✨ Características

- **Interfaz moderna y elegante** con paleta de colores "Modern Classic" (fondo Zinc-50, acentos Amber-600)
- **Sistema de reservas en línea** para citas de barbería
- **Catálogo de servicios** con precios y duraciones
- **Diseño completamente responsive** para móvil y escritorio
- **API RESTful** para gestión de reservas
- **Persistencia de datos** con almacenamiento basado en archivos JSON
- **Optimizado para SEO** y rendimiento
- **Tipografía optimizada** con next/font y fuente Geist

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Utilidades**: `clsx`, `tailwind-merge`
- **Tipografía**: next/font con Geist Font
- **Almacenamiento**: Sistema de archivos JSON (para simplicidad)
- **Despliegue**: Vercel (recomendado)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Rutas de la aplicación (App Router)
│   ├── api/                # Rutas de API
│   │   ├── auth/           # Autenticación (placeholder)
│   │   └── bookings/       # Gestión de reservas
│   ├── admin/              # Panel de administración (placeholder)
│   ├── book/               # Página de reservas
│   ├── services/           # Página de servicios
│   ├── page.tsx            # Página de inicio
│   └── layout.tsx          # Layout raíz
├── components/             # Componentes reutilizables
│   └── Navbar.tsx          # Barra de navegación
├── lib/                    # Lógica de negocio y utilidades
│   ├── auth.ts             # Autenticación (placeholder)
│   ├── constants.ts        # Constantes (servicios, etc.)
│   ├── store.ts            # Almacenamiento de datos (JSON file-based)
│   └── utils.ts            # Funciones utilitarias
├── public/                 # Assets estáticos
└── styles/                 # Estilos globales
    └── globals.css         # Estilos Tailwind
```

## 🚀 Comenzando

### Prerrequisitos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/FabianRn/web-barber-nextjs.git
cd web-barber-nextjs
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint para linting

## 🛣️ Rutas de la Aplicación

- `/` - Página de inicio
- `/services` - Catálogo de servicios ofrecidos
- `/book` - Sistema de reservas
- `/api/bookings` - API REST para gestionar reservas (GET, POST)
- `/api/auth/*` - Rutas de autenticación (placeholder)

## 💼 Servicios Ofrecidos

La barbería ofrece los siguientes servicios:

| Servicio | Descripción | Precio | Duración |
|----------|-------------|--------|----------|
| **Corte Clásico** | Corte tradicional con acabado detallado | $15 | 30 min |
| **Arreglo de Barba** | Perfilado y recorte de barba con toalla caliente | $10 | 20 min |
| **Combo Premium** | Corte de cabello + Barba + Masaje capilar | $22 | 60 min |
| **Corte Infantil** | Corte rápido y paciente para los más pequeños | $12 | 30 min |

## 🔌 API REST

### Obtener todas las reservas
**GET** `/api/bookings`

Respuesta:
```json
[
  {
    "id": "BK-1234567890-abcd",
    "serviceId": "classic-cut",
    "serviceName": "Corte Clásico",
    "date": "2024-01-15",
    "time": "14:30",
    "name": "Juan Pérez",
    "phone": "+1234567890",
    "status": "pending",
    "createdAt": "2024-01-10T10:30:00.000Z"
  }
]
```

### Crear una nueva reserva
**POST** `/api/bookings`

Body:
```json
{
  "serviceId": "classic-cut",
  "date": "2024-01-15",
  "time": "14:30",
  "name": "Juan Pérez",
  "phone": "+1234567890"
}
```

Respuesta:
```json
{
  "id": "BK-1234567890-abcd",
  "serviceId": "classic-cut",
  "serviceName": "Corte Clásico",
  "date": "2024-01-15",
  "time": "14:30",
  "name": "Juan Pérez",
  "phone": "+1234567890",
  "status": "pending",
  "createdAt": "2024-01-10T10:30:00.000Z"
}
```

## 🏗️ Arquitectura y Decisiones de Diseño

### Estado y Almacenamiento
- Los datos de reservas se almacenan en archivos JSON en el directorio `/data`
- Se utiliza el módulo `fs/promises` de Node.js para operaciones de archivo asíncronas
- Cada operación de lectura/escritura crea una nueva instancia de archivo para evitar condiciones de carrera

### Estilos y Diseño
- Paleta de colores basada en el sistema de colores de Tailwind:
  - Fondo: `bg-zinc-50` (gris muy claro)
  - Texto principal: `text-zinc-900` (gris muy oscuro)
  - Acentos: `text-amber-600`, `bg-amber-600` (ámbar cálido)
- Tipografía: Sistema de fuente Geist optimizado mediante `next/font`
- Transiciones y hover effects suaves para mejor experiencia de usuario

### Componentes
- **Navbar**: Navegación responsiva con enlaces a secciones principales
- **BookingForm**: Formulario de reservas de múltiples pasos con validación
- **ServiceCard**: Componentes reutilizables para mostrar servicios con precios

## 📱 Diseño Responsivo

La aplicación está totalmente optimizada para dispositivos móviles:
- Menú de navegación se convierte en menú hamburguesa en móviles
- Tarjetas de servicios se apilan verticalmente en pantallas pequeñas
- Formulario de reserva adapta su layout según el ancho de pantalla
- Tipografía y espaciado ajustados para legibilidad en todos los dispositivos

## 🚀 Despliegue

La forma más sencilla de desplegar esta aplicación es mediante [Vercel](https://vercel.com), los creadores de Next.js:

1. Sube tu repositorio a GitHub
2. Ve a [vercel.com/new](https://vercel.com/new)
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto de Next.js
5. Haz clic en "Deploy"

Alternativamente, puedes desplegar en cualquier plataforma que soporte Node.js:
```bash
npm run build
npm start
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Desarrollado con

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

Hecho con ❤️ por Fabian Reyes para la comunidad de barberías modernas.