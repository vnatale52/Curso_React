# 🛒 E-Commerce React App

Una aplicación web de comercio electrónico moderna, rápida y responsiva, desarrollada como una **Single Page Application (SPA)** utilizando el ecosistema de **React** y **Vite**.

Este proyecto simula un flujo completo de compras en línea, incluyendo gestión de catálogo, carrito de compras, autenticación de usuarios y un panel de administración con capacidades CRUD.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

---

## 📋 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Características Principales](#-características-principales)
3. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
4. [Instalación y Ejecución](#-instalación-y-ejecución)
5. [Estructura del Proyecto](#-estructura-del-proyecto)
6. [Guía de Uso](#-guía-de-uso)

---

## 📖 Descripción General

Esta aplicación fue construida para demostrar el manejo avanzado del estado en React mediante **Context API** y **Hooks**, sin depender de librerías de gestión de estado externas como Redux. 

El diseño visual utiliza el tema **"Lux" de Bootswatch** (basado en Bootstrap 5), asegurando una estética limpia, tipografías elegantes y una adaptabilidad total a dispositivos móviles (Mobile-First).

La aplicación permite alternar en tiempo real entre dos fuentes de datos:
1. **API Externa:** Consumo de datos reales desde *FakeStoreAPI*.
2. **JSON Local:** Carga de datos simulados desde un archivo local para pruebas offline o de desarrollo.

---

## ✨ Características Principales

### 🛍️ Experiencia de Usuario (Cliente)
*   **Catálogo Dinámico:** Visualización de productos con imágenes, precios y descripciones.
*   **Paginación:** Navegación optimizada entre múltiples productos.
*   **Carrito de Compras Inteligente:**
    *   Agrupación automática por cantidad.
    *   Cálculo de subtotales y total en tiempo real.
    *   Persistencia durante la sesión.
*   **Detalle de Producto:** Rutas dinámicas (`/producto/:id`) para ver información extendida.
*   **Formulario de Contacto:** Simulación de envío de correos con feedback visual (spinners y alertas).

### 🔐 Seguridad y Autenticación
*   **Login Simulado:** Sistema de autenticación que diferencia entre roles de `User` y `Admin`.
*   **Rutas Protegidas:**
    *   El acceso al `/carrito` requiere estar logueado.
    *   El acceso al `/admin` requiere rol de Administrador.
*   **Redirecciones:** Manejo inteligente de usuarios no autorizados.

### 🛠️ Panel de Administración (Backoffice)
*   **CRUD Completo en Memoria:**
    *   **Create:** Alta de nuevos productos con descripción e imagen.
    *   **Read:** Listado de inventario actual.
    *   **Update:** Edición de precios, nombres y descripciones.
    *   **Delete:** Baja de productos por falta de stock.
*   **Feedback Visual:** Indicadores de modo "Edición" vs "Creación".

---

## 💻 Tecnologías Utilizadas

*   **Core:** React.js (v18+)
*   **Build Tool:** Vite.js (para un entorno de desarrollo ultrarrápido).
*   **Lenguaje:** JavaScript (ES Modules).
*   **Enrutamiento:** React Router DOM v6.
*   **Gestión de Estado:** React Context API (`ProductContext`, `AuthContext`, `CartContext`).
*   **Estilos:** Bootstrap 5 + Bootswatch (Theme Lux) + Bootstrap Icons.
*   **Peticiones HTTP:** Fetch API nativa.

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para correr el proyecto en tu entorno local:

### Prerrequisitos
*   Node.js (v14 o superior)
*   NPM o Yarn

### Pasos

1.  **Descomprimir / Clonar el proyecto:**
    Ubícate en la carpeta raíz del proyecto.

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en: `http://localhost:5173/`

4.  **Compilar para producción (Opcional):**
    ```bash
    npm run build
    ```

---

## 📂 Estructura del Proyecto

```text
src/
├── components/       # Componentes reutilizables (Navbar, Layout, Card, Pagination)
├── context/          # Lógica de estado global (Auth, Cart, Products)
├── pages/            # Vistas principales (Home, Login, Admin, Cart, etc.)
├── services/         # Archivos de datos estáticos (demo-products.json)
├── App.jsx           # Configuración de Rutas
└── main.jsx          # Punto de entrada



🎮 Guía de Uso
1. Iniciar Sesión
Dirígete al botón "Iniciar Sesión" en el Navbar.
Usuario Común: Ingresa un nombre y haz clic en "Ingresar".
Administrador: Ingresa un nombre, activa el switch "Entrar como Administrador" y haz clic en "Ingresar".
2. Gestión de Productos (Admin)
Una vez logueado como Admin, aparecerá la opción "Admin" en el menú superior.
Desde allí podrás agregar productos nuevos o editar/eliminar los existentes.
Nota: Los cambios son persistentes mientras dure la sesión del navegador (Single Page Application).
3. Realizar una Compra
Agrega productos al carrito desde el catálogo.
Ve al icono del Carrito.
Presiona "Finalizar Compra" para simular el cierre de la transacción.
