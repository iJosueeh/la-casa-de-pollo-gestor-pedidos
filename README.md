# 🍗 La Casa de Pollo - Gestor de Pedidos

Sistema de gestión de pedidos para restaurante desarrollado con React, TypeScript y Supabase.

## 📋 Descripción

Aplicación web moderna para la gestión integral de pedidos de restaurante, que incluye funcionalidades de administración, catálogo de productos, carrito de compras y seguimiento de órdenes.

## ✨ Características

- 🔐 **Autenticación de usuarios** con Supabase
- 🛒 **Carrito de compras** con gestión de productos
- 📦 **Gestión de pedidos** en tiempo real
- 👨‍💼 **Panel de administración** completo
- 📱 **Diseño responsive** para móviles y tablets
- 📊 **Visualización de datos** con gráficos (Recharts)
- 🎨 **UI moderna** con Tailwind CSS y Headless UI

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Redux Toolkit** - Gestión de estado
- **Tailwind CSS** - Estilos utilitarios
- **Headless UI** - Componentes accesibles
- **Heroicons & Lucide React** - Iconografía
- **Recharts** - Visualización de datos
- **Supabase** - Backend as a Service

### Backend
- **Node.js** con **Express**
- **TypeScript**
- **Supabase** - Base de datos y autenticación
- **CORS** - Configuración de seguridad

## 📁 Estructura del Proyecto

```
la-casa-de-pollo-gestor-pedidos/
├── src/
│   ├── features/          # Características por módulo
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── products/
│   ├── pages/             # Páginas de la aplicación
│   ├── shared/            # Componentes y utilidades compartidas
│   ├── store/             # Configuración de Redux
│   ├── routes/            # Configuración de rutas
│   └── config/            # Configuraciones generales
├── backend/               # API backend
│   └── src/
└── public/               # Archivos estáticos
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación Frontend

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Ejecutar linter
npm run lint
```

### Instalación Backend

```bash
cd backend

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev
```

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## 📄 Scripts Disponibles

### Frontend
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run preview` - Vista previa del build de producción
- `npm run lint` - Ejecuta el linter de ESLint

### Backend
- `npm run dev` - Inicia el servidor backend con nodemon

## 🎯 Páginas Principales

- **Login** - Autenticación de usuarios
- **Productos** - Catálogo de productos disponibles
- **Carrito** - Gestión del carrito de compras
- **Pedidos** - Historial y seguimiento de órdenes
- **Admin** - Panel de administración

## 🔧 Tecnologías de Desarrollo

- ESLint - Linting de código
- TypeScript ESLint - Reglas específicas para TypeScript
- PostCSS - Procesamiento de CSS
- Autoprefixer - Prefijos automáticos de CSS

## 📝 Licencia

Proyecto privado - Todos los derechos reservados

## 👥 Contribución

Este es un proyecto privado. Para contribuir, contacta con el equipo de desarrollo.

---

Desarrollado con ❤️ para La Casa de Pollo
