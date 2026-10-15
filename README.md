# Punto Crítico ⚠️

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black.svg?logo=three.js&logoColor=white)](https://threejs.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28.svg?logo=firebase&logoColor=white)](https://firebase.google.com)

**Punto Crítico** es una plataforma de visualización interactiva e inmersiva de datos sobre la desinformación en la prevención cardiovascular en Argentina. Desarrollado originalmente para el Concurso **"Contar con Datos" 2026** de la **Universidad de San Andrés**, este proyecto combina narrativa interactiva, cartografía 3D, modelos tridimensionales interactivos, encuestas en tiempo real con persistencia en la nube y un diseño de experiencia de usuario sonoro y envolvente.

---

## 🌌 Filosofía y Estética: El Enfoque Inmersivo

A diferencia de los paneles de control de datos estáticos y tradicionales, **Punto Crítico** adopta una interfaz con estética de **HUD (Heads-Up Display) futurista y de ciencia ficción**. Esta decisión de diseño busca generar un alto impacto cognitivo y emocional, transformando estadísticas abstractas en una experiencia de exploración multisensorial y activa.

- **Diseño Sonoro Reactivo**: Cuenta con música de fondo ambiental y efectos de sonido dinámicos que acompañan las interacciones (clics, transiciones, respuestas a encuestas).
- **Transiciones y Fluidez**: Transiciones fluidas a través de un enrutador animado con `AnimatePresence` y efectos HUD de escaneo y parpadeo visual.
- **Flujo de Carga y Precarga Real**: Sistema estructurado de `PreloadTasks` que carga de forma asíncrona las páginas secundarias, el modelo 3D del corazón y los datasets geoespaciales optimizando el rendimiento inicial.

---

## 🗺️ Módulos Principales de la Plataforma

El proyecto se estructura en 9 ejes temáticos diferenciados por paletas cromáticas HUD dedicadas para facilitar la distinción visual:

1. **Riesgos (Rojo HUD - `#FF0000`)**: Exploración de los factores de riesgo cardiovascular prevalentes en la población argentina mediante un sistema de tarjetas interconectadas que demuestran la correlación biológica y de estilo de vida.
2. **Impacto (Naranja HUD - `#FF8000`)**: Visualización analítica del impacto sanitario, sociocultural y los altos costos económicos y de vidas asociadas a la falta de prevención, integrando gráficos de Recharts.
3. **Acceso (Azul HUD - `#0080FF`)**: Línea de tiempo centenaria interactiva y adaptativa que recorre la evolución del consumo y difusión de información médica desde 1920 (almanaques impresos) hasta 2020 (smartphones y redes sociales).
4. **Hábitos (Esmeralda HUD - `#10B981`)**: Sistema de "Mitos vs. Realidades" complementado con una **Encuesta de Hábitos Interactiva** conectada directamente a Firebase Firestore, permitiendo comparar las respuestas del usuario con estadísticas globales en tiempo real.
5. **Soluciones (Cian HUD - `#06B6D4`)**: Guía de acción pragmática y categorizada para el autocuidado cardiovascular con recomendaciones específicas basadas en el consenso científico actual.
6. **Historias (Morado HUD - `#8B5CF6`)**: Homenaje interactivo al Dr. René Favaloro mediante una línea de tiempo biográfica, un diagrama anatómico del bypass aortocoronario y un **corazón 3D interactivo y latiendo** renderizado en tiempo real con Three.js, junto a testimonios de pacientes reales.
7. **Mapa 3D (Índigo HUD - `#6366F1`)**: Visor geoespacial tridimensional interactivo de la República Argentina con interpolación de datos por provincia y año, filtros interactivos de mortalidad, recursos médicos y un tutorial integrado paso a paso.
8. **Fuentes (Gris HUD - `#94A3B8`)**: Registro exhaustivo, transparente y enlazado de la bibliografía académica y bases de datos oficiales utilizadas para garantizar la reproducibilidad y el rigor metodológico.
9. **Bienvenida e Introducción**: Flujo narrativo de inicio con pantalla de inicio táctil, carga de sistemas interactiva y simulación de calibración del HUD del usuario.

---

## 🛠️ Stack Tecnológico

La arquitectura de software destaca por su modernidad, alto rendimiento de renderizado y tipado estricto:

### Core & Framework
* **React 19**: Biblioteca de UI de última generación, aprovechando el manejo optimizado de efectos y componentes asíncronos.
* **TypeScript (TypeScript 6.0+)**: Tipado estático en todo el ecosistema de datos, servicios y componentes de UI.
* **React Router (v8)**: Enrutamiento SPA con precarga asíncrona de páginas diferidas (`react-lazy-with-preload`).
* **Vite 8**: Servidor de desarrollo ultrarrápido y compilador de producción optimizado.

### Visualización & 3D
* **Three.js** con `@react-three/fiber` y `@react-three/drei`: Renderizado 3D de alto rendimiento para el mapa geográfico provincial y el modelo anatómico del corazón.
* **D3 (d3-geo)**: Análisis espacial e interpretación de coordenadas para proyectar correctamente el archivo `provincias.geojson`.
* **Recharts**: Gráficos interactivos de alta fidelidad para el análisis cuantitativo de impacto y variables sociodemográficas.

### Estilos & Animaciones
* **Tailwind CSS v4**: Compilación de estilos CSS moderna, veloz y declarativa.
* **Framer Motion (`motion/react` v13)**: Transiciones suaves de páginas, animaciones reactivas a gestos e interfaces dinámicas del HUD.

### Infraestructura & Persistencia
* **Firebase v12**: Conexión nativa con Firestore para el guardado y consulta en tiempo real de los datos recopilados en la encuesta de hábitos del usuario.

---

## 📂 Estructura del Directorio `src/`

```bash
src/
├── assets/                 # Recursos gráficos, logotipos e imágenes multimedia históricas
├── components/
│   ├── audio/              # Manejadores de música ambiental y paisaje sonoro (SoundContext)
│   ├── habitos/            # Tarjetas de mitos y componente interactivo de encuestas (Firebase)
│   ├── historias/          # Corazón 3D (Three.js), línea de tiempo de Favaloro y testimonios
│   ├── impacto/            # Visualización cuantitativa de estadísticas y paradojas socioculturales
│   ├── mapa/               # Mapa3D interactivo, panel de control de indicadores y tutorial
│   ├── riesgo/             # Módulo de tarjetas de factores de riesgo cardiovascular
│   ├── soluciones/         # Bloques informativos con recomendaciones y consejos prácticos
│   └── ui/                 # Elementos comunes del HUD (Header, HudFrame, Loader, WelcomeScreen)
├── config/                 # Inicialización y configuración de Firebase
├── contexts/               # Controladores de Contexto (Sound, Intro, MapTransition)
├── data/
│   ├── services/           # Conexión con servicios (Firestore, APIs locales de datos)
│   ├── sources/            # Archivos locales de datos JSON (mortalidad, médicos, hábitos)
│   └── types/              # Interfaces y esquemas de datos estructurados de TypeScript
├── hooks/                  # Custom hooks de React (useShouldReduceMotion)
├── layouts/                # Estructuras maestras de páginas (MainLayout, MapLayout)
├── pages/                  # Vistas lógicas principales del portal
├── services/               # Pruebas e integraciones de conectividad (Firebase test)
├── App.tsx                 # Nodo raíz, orquestador de fases de carga y enrutador
└── index.css               # Importación de Tailwind v4 y variables de temas HUD
```

---

## 🚀 Instalación y Uso Local

Sigue estos pasos para desplegar **Punto Crítico** de forma local en tu máquina de desarrollo:

### Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y `npm`.

### Paso 1: Clonar el repositorio e instalar dependencias
```bash
git clone <url-del-repositorio>
cd punto-critico
npm install
```

### Paso 2: Configurar las variables de entorno (Opcional)
Crea un archivo `.env` en el directorio raíz para inicializar los servicios de Firebase de la encuesta interactiva:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### Paso 3: Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación se abrirá en tu navegador en `http://localhost:5173`.

### Paso 4: Compilar para producción
Para compilar y optimizar la aplicación para su despliegue en producción:
```bash
npm run build
```
Puedes previsualizar el build generado localmente utilizando:
```bash
npm run preview
```

---

## 📊 Rigor Científico y Fuentes Oficiales

La integridad y precisión de la información de **Punto Crítico** está respaldada por datos de fuentes públicas, académicas y oficiales de primer nivel:
- **Estadísticas de Mortalidad**: Dirección de Estadísticas e Información en Salud (**DEIS**) y el Ministerio de Salud de la Nación.
- **Demografía y Factores de Riesgo**: Cuarta Encuesta Nacional de Factores de Riesgo (**ENFR**) publicada por el **INDEC**.
- **Información Sanitaria y Cardiología**: Sociedad Argentina de Cardiología (**SAC**), Fundación Cardiológica Argentina y el Instituto de Efectividad Clínica y Sanitaria (**IECS**).
- **Estudios de Opinión y Confianza**: Encuestas del Observatorio Humanitario de la **Cruz Roja Argentina**, CIS (**UADE**) e **Ipsos Global Advisor**.

Para consultar las citas completas y datasets de manera abierta, visita la sección `/fuentes` integrada dentro de la plataforma.

---

## 🎓 Concurso "Contar con Datos" 2026
Este proyecto fue ideado, diseñado e implementado con el fin de promover la alfabetización de datos sanitarios y la concientización sobre la salud cardiovascular en la población argentina en el marco de la convocatoria nacional de la **Universidad de San Andrés**.

Co-Authored-By: Claude Code <noreply@anthropic.com>
