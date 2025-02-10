# Notes App 📝

**Notes App** es una aplicación web para tomar notas, diseñada para ser simple y fácil de usar. Está construida con **Next.js**, **TypeScript**, y utiliza **Supabase** para almacenamiento y manejo de sesiones de usuario.

## Características 🌟

- 🖊️ Crear, editar, archivar, eliminar notas.
- 💾 Almacenamiento seguro de notas en **Supabase**.
- 🔐 Manejo de sesiones de usuario con autenticación.
- 🔔 Notificaciones de alertas usando **Sonner**.
- 🎨 Interfaz con **Tailwind CSS**.

## Tecnologías utilizadas ⚙️

- **Next.js**: Framework para aplicaciones web 🚀.
- **TypeScript**: Lenguaje de programación para mejorar la calidad del código 🖥️.
- **Supabase**: Backend como servicio (BaaS) para base de datos y autenticación 🔑.
- **Sonner**: Librería de notificaciones para alertas ⚡.
- **Tailwind CSS**: Framework de CSS para un diseño rápido y personalizable 🎨.
- **pnpm**: Gestor de paquetes rápido y eficiente ⚡.

## Instalación ⚙️

1. Clona el repositorio:
    ```bash
    git clone https://github.com/sebasdex/notes-app.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd notes-app
    ```

3. Instala las dependencias:
    ```bash
    pnpm install
    ```

4. Crea un archivo `.env.local` en la raíz del proyecto con las credenciales de **Supabase**:
    ```plaintext
    NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
    ```

5. Inicia el servidor de desarrollo:
    ```bash
    pnpm run dev
    ```

6. Accede a la aplicación en tu navegador en `http://localhost:3000`.
