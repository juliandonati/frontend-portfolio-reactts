# Frontend - Plataforma de Portafolios Web Multiusuario

Este es el cliente web de la plataforma de portafolios, desarrollado con **React** y **TypeScript**. La aplicación se encarga de la interfaz de usuario, la navegación y el manejo de sesiones de forma segura, integrándose directamente con la API REST del backend.

> 💻 **Backend API:** [Enlace al repositorio del Backend API en Java, Spring Boot](https://github.com/juliandonati/backend-portfolio)

## 🛠️ Tecnologías Principales

- **[React](https://react.dev/):** Biblioteca para la construcción de interfaces de usuario dinámicas.
- **[TypeScript](https://www.typescriptlang.org/):** Lenguaje para tipado estático, mejorando la mantenibilidad y escalabilidad.
- **[Vite](https://vitejs.dev/):** Herramienta de compilación de próxima generación para un desarrollo extremadamente rápido.
- **[React Router](https://reactrouter.com/):** Gestión declarativa de rutas y navegación.
- **[React Cookie](https://www.npmjs.com/package/react-cookie):** Gestión de cookies para el manejo de sesiones y autenticación basada en tokens.

## ⚙️ Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:

- [Node.js](https://nodejs.org/) (v18.x o superior).
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/).

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/juliandonati/frontend-portfolio-reactts
   cd frontend-portfolio-reactts

2. **Instalar las dependencias**
   ```bash
   npm install

3. **Configurar la conexión con el Backend:** La configuración de la API se encuentra centralizada en el archivo /src/services/apiConfig.ts. Asegúrate de actualizar la dirección IP según tu entorno de red local 
   ```bash
   // src/services/apiConfig.ts
   const API_VERSION = 'v1';
   export const API_BASE_URL = 'http://<tu dirección ip>:8080/api/' + API_VERSION;

4. **Iniciar el entorno de desarrollo**
   ```bash
   npm run dev
   
