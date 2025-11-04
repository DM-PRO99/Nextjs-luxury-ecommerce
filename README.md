# Luxury Timepieces E-commerce

E-commerce de relojes de lujo construido con Next.js 13, NextAuth, MongoDB y Tailwind CSS.

## 🚀 Características

- ✅ **Autenticación completa** con NextAuth (Credentials Provider)
- ✅ **Base de datos MongoDB** con Mongoose
- ✅ **Diseño de lujo** con tema oscuro y animaciones
- ✅ **Carrito de compras** funcional con Zustand
- ✅ **Componentes UI modernos** con Tailwind CSS
- ✅ **Animaciones suaves** con Framer Motion
- ✅ **Iconos** con Lucide React
- ✅ **Tipado completo** con TypeScript

## 📋 Requisitos Previos

- Node.js 18+ instalado
- MongoDB instalado localmente o cuenta en MongoDB Atlas
- npm o yarn

## 🔧 Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/nextauth-ecommerce
# O usa MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-clave-secreta-aqui-genera-con-openssl-rand-base64-32

# Email Configuration (Opcional)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com
```

### 3. Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 4. Iniciar MongoDB

Si usas MongoDB local:

```bash
mongod
```

Si usas MongoDB Atlas, asegúrate de tener tu cluster activo y la URI correcta.

## 🏃 Ejecutar la aplicación

### Modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Modo producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   └── auth/          # Rutas de autenticación
│   ├── store/             # Páginas del e-commerce
│   │   ├── checkout/      # Página de checkout
│   │   └── collection/    # Página de colección
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   └── dashboard/         # Dashboard de usuario
├── components/
│   ├── cart/              # Componentes del carrito
│   ├── luxury/            # Componentes de productos
│   ├── store/             # Header y navegación
│   └── ui/                # Componentes UI reutilizables
├── hooks/                 # Custom hooks (carrito, scroll)
├── libs/                  # Utilidades y configuración
│   ├── mongodb.ts         # Conexión a MongoDB
│   ├── mock-data.ts       # Datos de ejemplo
│   └── utils.ts           # Funciones auxiliares
├── models/                # Modelos de Mongoose
│   └── user.ts            # Modelo de usuario
└── types/                 # Tipos de TypeScript
    └── products.ts        # Tipos de productos
```

## 🔐 Autenticación

La aplicación usa **NextAuth** con **Credentials Provider** y **MongoDB**:

- **Registro**: `/register` - Crea una cuenta nueva
- **Login**: `/login` - Inicia sesión
- **Perfil**: `/dashboard/profile` - Página protegida (requiere autenticación)

Los usuarios se almacenan en MongoDB con:
- Email (único)
- Password (hasheado con bcrypt)
- Fullname
- Timestamps (createdAt, updatedAt)

## 🛒 E-commerce

### Características del carrito:
- Agregar/eliminar productos
- Actualizar cantidades
- Persistencia con localStorage (Zustand)
- Drawer lateral animado
- Cálculo automático de totales

### Productos:
- Tarjetas de producto con imágenes
- Quick add desde la tarjeta
- Ratings y reviews
- Precios con descuentos
- Badges (NEW, descuento %)

## 🎨 Diseño

### Tema de colores:
- **Obsidian**: `rgb(15, 15, 20)` - Fondo oscuro
- **Platinum**: `rgb(245, 245, 250)` - Texto claro
- **Champagne**: `rgb(212, 175, 55)` - Acento dorado
- **Gold**: `rgb(255, 215, 0)` - Gradientes

### Fuentes:
- **Playfair Display** - Serif para títulos
- **Inter** - Sans-serif para texto

## 🛠️ Tecnologías

- **Next.js 13** - Framework React con App Router
- **TypeScript** - Tipado estático
- **NextAuth** - Autenticación
- **MongoDB + Mongoose** - Base de datos
- **Tailwind CSS** - Estilos
- **Zustand** - Estado global (carrito)
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **Bcrypt** - Hash de passwords

## 📝 Notas

- Los productos actuales son datos de ejemplo (`mock-data.ts`)
- Para producción, conecta a una base de datos real de productos
- Configura un proveedor de email para funcionalidades de recuperación de contraseña
- Las imágenes usan Unsplash como placeholder

## 🚀 Deploy

### Vercel (Recomendado)

1. Sube el proyecto a GitHub
2. Conecta con Vercel
3. Configura las variables de entorno
4. Deploy automático

### Otras plataformas

Asegúrate de configurar:
- Variables de entorno
- Node.js 18+
- Build command: `npm run build`
- Start command: `npm start`
