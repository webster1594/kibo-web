# Kivo - Herramientas para Freelancers

Plataforma web con herramientas útiles para freelancers en América Latina.

## Características Actuales

✅ **Página de Inicio** - Muestra todas las herramientas disponibles
✅ **Calculadora de Pagos** - Calcula comisiones de PayPal, Stripe, Wise por país
✅ **Panel Admin** - Gestiona comisiones (agregar, editar, eliminar)
✅ **Responsive Design** - Funciona en mobile, tablet y desktop

## Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta Supabase (para la base de datos)

## Instalación y Setup

### 1. Acceder al proyecto
```bash
cd /Users/webster/Documents/Claude/Projects/kivo/kivo-web
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

**IMPORTANTE**: Obtén tus credenciales de Supabase:
1. Ve a https://supabase.com
2. Crea un proyecto nuevo
3. Ve a Settings → API
4. Copia `Project URL` y `anon public key`
5. Pega en `.env.local`

## Ejecutar el Proyecto

### Desarrollo
```bash
npm run dev
```

Luego abre http://localhost:3000 en tu navegador.

### Producción
```bash
npm run build
npm run start
```

## Rutas Disponibles

- `/` - Página de inicio
- `/herramientas` - Listado de herramientas
- `/calculadora-pagos` - Calculadora de pagos (herramienta principal)
- `/admin` - Panel admin (protegido con contraseña)

## Panel Admin

### Acceso
- URL: http://localhost:3000/admin
- Contraseña: `898693510Webster`

### Funcionalidades
- Ver todas las comisiones
- Agregar nuevas comisiones
- Editar comisiones existentes
- Eliminar comisiones

## Próximas Fases

- Integración con Supabase (base de datos)
- Integración con Google AdSense
- Más herramientas (cotizaciones, precios, etc.)
- Más países de América Latina
- Despliegue en Vercel

## Contacto

Para preguntas o sugerencias sobre Kivo.

---

**Nota**: Los datos de comisiones en esta versión inicial son estimados. Verifica las tasas actuales de cada plataforma antes de usar en producción.
