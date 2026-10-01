# Punto Crítico ⚠️

Proyecto de visualización de datos sobre la desinformación en la prevención cardiovascular en Argentina.

Concurso "Contar con Datos" 2026 — Universidad de San Andrés.

## Sistema: Estructura Completa del Proyecto

### Directorio Principal: `src/`

**Archivos raíz:**
- `App.css` - Estilos CSS globales (plantilla de Vite)
- `App.tsx` - Componente principal de la aplicación con rutas
- `index.css` - Importación de Tailwind CSS
- `main.tsx` - Punto de entrada de React para el DOM

**Subdirectorios:**

#### 1. `assets/`
- `hero.png` - Imagen hero
- `react.svg` - Icono de React
- `vite.svg` - Icono de Vite

#### 2. `components/ui/`
- `Header.tsx` - Componente de encabezado de navegación con menú móvil
- `HudFrame.tsx` - Marco de interfaz de usuario con estilo HUD diagonal
- `PageTransition.tsx` - Animaciones de transición entre páginas
- `ViewContainer.tsx` - Contenedor de contenido reutilizable con sistema de colores

#### 3. `hooks/`
- `useShouldReduceMotion.ts` - Hook personalizado para respeto de movimiento reducido

#### 4. `layouts/`
- `MainLayout.tsx` - Diseño principal que encierra todas las páginas

#### 5. `pages/`
**Pages principales (todas con diseño consistente):**
- `Acceso.tsx` - Página de Acceso (color azul)
- `Habitos.tsx` - Página de Hábitos (color esmeralda)
- `Historias.tsx` - Página de Historias (color morado)
- `Home.tsx` - Página de inicio
- `Impacto.tsx` - Página de Impacto (color naranja)
- `Mapa.tsx` - Página de Mapa (color índigo)
- `NotFound.tsx` - Página de error 404
- `Riesgos.tsx` - Página de Riesgos (color rojo)
- `Soluciones.tsx` - Página de Soluciones (color cian)

### Tecnologías Utilizadas

**Frontend:**
- React 18 con TypeScript
- Vite como enlazador/bundler
- Tailwind CSS para estilos
- Framer Motion para animaciones
- React Router para enrutamiento

**Características Técnicas:**
- Enrutamiento SPA con cargado diferido
- Animaciones smooth con `motion/react`
- Hook personalizado para accesibilidad (`useShouldReduceMotion`)
- Componente HUD estilizado con recorte diagonal
- Sistema de colores consistente en todas las páginas

### Patrón Arquitectónico

1. **MainLayout.tsx** encierra todas las páginas
2. **ViewContainer.tsx** provee diseño consistente para cada página
3. **PageTransition.tsx** anima transiciones entre rutas
4. **Header.tsx** provee navegación principal con soporte móvil
5. **HudFrame.tsx** crea marco visual único de interfaz de usuario

### Función del Proyecto

Este proyecto es una aplicación educativa diseñada para visualizar datos sobre desinformación en prevención cardiovascular en Argentina. Las nueve páginas principales cubren diferentes aspectos del tema, cada una presentada con un estilo visual consistente pero temas de color únicos para facilitar la distinción visual.

### Enrutamiento

Las rutas están definidas en `App.tsx`:
- `/` - Inicio
- `/riesgos` - Riesgos
- `/impacto` - Impacto
- `/acceso` - Acceso
- `/habitos` - Hábitos
- `/soluciones` - Soluciones
- `/historias` - Historias
- `/mapa` - Mapa
- `*` - Página 404 (atrapar todas las rutas no definidas)