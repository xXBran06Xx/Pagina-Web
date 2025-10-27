// Importamos el tipo "Metadata" desde Next.js
// Esto nos permite tipar y definir metadatos de la página (como título, descripción, etc.)
import type { Metadata } from 'next'

// Importamos dos fuentes de la librería Geist: 
// - GeistSans (fuente sans-serif moderna)
// - GeistMono (fuente monoespaciada para código o texto técnico)
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

// Importamos el componente Analytics de Vercel
// Este se encarga de recopilar datos de uso y analítica automáticamente
import { Analytics } from '@vercel/analytics/next'

// Importamos los estilos globales definidos en el archivo "globals.css"
// Aquí se centralizan los estilos comunes de toda la aplicación
import './globals.css'

// Definimos un objeto llamado "metadata"
// Este contiene información descriptiva de la aplicación, como:
// - title: título de la app que aparece en la pestaña del navegador
// - description: breve descripción del proyecto
// - generator: nombre del generador usado (en este caso, "v0.app")
export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

// Exportamos el componente principal RootLayout
// Este se encarga de definir la estructura base que tendrán TODAS las páginas de la aplicación
export default function RootLayout({
  children, // "children" representa el contenido dinámico de cada página que se renderizará dentro del layout
}: Readonly<{
  children: React.ReactNode // Definimos el tipo: cualquier contenido válido de React
}>) {
  return (
    // Definimos la estructura base en HTML
    <html lang="en"> {/* Se especifica que el idioma principal es inglés */}
      <body 
        // Aplicamos clases a la etiqueta <body>
        // - "font-sans": clase de Tailwind para tipografía sans-serif
        // - ${GeistSans.variable}: inyecta la fuente Geist Sans
        // - ${GeistMono.variable}: inyecta la fuente Geist Mono
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
      >
        {/* Aquí se renderiza el contenido dinámico de cada página */}
        {children}

        {/* Insertamos el componente de analíticas de Vercel */}
        {/* Este se encarga de monitorear las visitas y uso de la aplicación */}
        <Analytics />
      </body>
    </html>
  )
}
