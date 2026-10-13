import ViewContainer from '../components/ui/ViewContainer'

// ─── Datos estáticos de las fuentes ───
// Se hardcodean acá para no depender de un JSON externo.
// El objetivo es que el jurado vea de un vistazo la calidad y variedad de fuentes.

interface FuenteItem {
  nombre: string
  descripcion: string
  url: string
  logo: string // URL directa al logo
  categoria: 'datos' | 'salud' | 'investigacion' | 'imagenes' | 'sonidos'
}

const FUENTES: FuenteItem[] = [
  // ─── Datos y estadísticas oficiales ───
  {
    nombre: 'INDEC — Instituto Nacional de Estadística y Censos',
    descripcion: 'Organismo oficial que produce las estadísticas nacionales. Fuente principal de la ENFR 2018.',
    url: 'https://www.indec.gob.ar',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/INDEC_logo.svg/320px-INDEC_logo.svg.png',
    categoria: 'datos',
  },
  {
    nombre: 'DEIS — Dirección de Estadísticas e Información en Salud',
    descripcion: 'Depende del Ministerio de Salud. Produce y difunde datos de mortalidad, natalidad y recursos de salud.',
    url: 'https://www.argentina.gob.ar/salud/deis',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Logo_Ministerio_de_Salud_-_Argentina.png/320px-Logo_Ministerio_de_Salud_-_Argentina.png',
    categoria: 'datos',
  },
  {
    nombre: 'datos.gob.ar — Portal de Datos Abiertos',
    descripcion: 'Portal oficial de datos abiertos del Gobierno argentino. Fuente de datasets de médicos y defunciones.',
    url: 'https://datos.gob.ar',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Datos.gob.ar_logo.svg/320px-Datos.gob.ar_logo.svg.png', // Placeholder, puede no existir
    categoria: 'datos',
  },
  // ─── Salud y cardiología ───
  {
    nombre: 'SAC — Sociedad Argentina de Cardiología',
    descripcion: 'Referente científico en cardiología. Fuente del Registro RENACER-CV y estudios sobre desinformación.',
    url: 'https://www.sac.org.ar',
    logo: 'https://cdn.brandfetch.io/sac.org.ar/icon.png',
    categoria: 'salud',
  },
  {
    nombre: 'Fundación SAC — Fundación Sociedad Argentina de Cardiología',
    descripcion: 'Brazo comunitario de la SAC. Promueve la prevención cardiovascular en todo el país.',
    url: 'https://www.fundacioncardiologica.org',
    logo: 'https://cdn.brandfetch.io/fundacioncardiologica.org/icon.png',
    categoria: 'salud',
  },
  {
    nombre: 'IECS — Instituto de Efectividad Clínica y Sanitaria',
    descripcion: 'Institución académica afiliada a la UBA. Coordinó el estudio CESCAS sobre salud cardiovascular en el Cono Sur.',
    url: 'https://www.iecs.org.ar',
    logo: 'https://cdn.brandfetch.io/iecs.org.ar/icon.png',
    categoria: 'salud',
  },
  // ─── Investigación y opinión ───
  {
    nombre: 'Ipsos — Global Advisor',
    descripcion: 'Consultora global de investigación de mercados y opinión. Fuente del Informe de Servicios de Salud 2025.',
    url: 'https://www.ipsos.com',
    logo: 'https://cdn.brandfetch.io/ipsos.com/icon.png',
    categoria: 'investigacion',
  },
  {
    nombre: 'UADE — Universidad Argentina de la Empresa',
    descripcion: 'A través del CIS (Centro de Investigaciones Sociales) publicó el informe sobre salud y telemedicina 2025.',
    url: 'https://www.uade.edu.ar',
    logo: 'https://cdn.brandfetch.io/uade.edu.ar/icon.png',
    categoria: 'investigacion',
  },
  {
    nombre: 'Cruz Roja Argentina',
    descripcion: 'Observatorio Humanitario. Publicó el estudio sobre percepción de la vacunación y desinformación en 2026.',
    url: 'https://www.cruzroja.org.ar',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Cruz_Roja_Argentina.svg/320px-Cruz_Roja_Argentina.svg.png',
    categoria: 'investigacion',
  },
  // ─── Imágenes históricas ───
  {
    nombre: 'Wikimedia Commons',
    descripcion: 'Repositorio de medios de dominio público y Creative Commons. Fuente de las imágenes históricas de la línea de tiempo.',
    url: 'https://commons.wikimedia.org',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Commons-logo-en.svg/320px-Commons-logo-en.svg.png',
    categoria: 'imagenes',
  },
  {
    nombre: 'Cleveland Clinic',
    descripcion: 'Centro médico académico de EE. UU. donde Favaloro desarrolló el bypass. Cedió el retrato para su uso en el proyecto.',
    url: 'https://my.clevelandclinic.org',
    logo: 'https://cdn.brandfetch.io/clevelandclinic.org/icon.png',
    categoria: 'imagenes',
  },
  {
    nombre: 'NIH — National Heart, Lung, and Blood Institute',
    descripcion: 'Instituto Nacional del Corazón, Pulmón y Sangre de EE. UU. Autor del diagrama de bypass aortocoronario.',
    url: 'https://www.nhlbi.nih.gov',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/NIH_Logo.svg/320px-NIH_Logo.svg.png',
    categoria: 'imagenes',
  },
  // ─── Sonidos ───
  {
    nombre: 'Freesound',
    descripcion: 'Base de datos colaborativa de efectos de sonido bajo licencias Creative Commons.',
    url: 'https://freesound.org',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Freesound_project_website_logo.png',
    categoria: 'sonidos',
  },
  {
    nombre: 'Pixabay',
    descripcion: 'Comunidad de imágenes y sonidos de dominio público. Fuente de algunos efectos de sonido de la interfaz.',
    url: 'https://pixabay.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Pixabay-logo.svg/320px-Pixabay-logo.svg.png',
    categoria: 'sonidos',
  },
]

// ─── Mapa de categorías para mostrar ───
const CATEGORIAS: Record<FuenteItem['categoria'], string> = {
  datos: 'Datos y estadísticas oficiales',
  salud: 'Salud y cardiología',
  investigacion: 'Investigación y opinión',
  imagenes: 'Imágenes históricas',
  sonidos: 'Sonidos y efectos',
}

export default function Fuentes() {
  // Agrupamos las fuentes por categoría
  const agrupadas = FUENTES.reduce<Record<string, FuenteItem[]>>((acc, f) => {
    if (!acc[f.categoria]) acc[f.categoria] = []
    acc[f.categoria].push(f)
    return acc
  }, {})

  return (
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1 className="font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
          Fuentes
        </h1>
      </section>

      {/* ── Intro ── */}
      <p className="text-center text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-16 leading-relaxed">
        Todos los datos, imágenes y sonidos utilizados en este proyecto provienen
        de fuentes públicas, verificables y de acceso abierto. Acá está el
        detalle de cada una.
      </p>

      {/* ── Grid de dos columnas ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(agrupadas).map(([categoria, items]) => (
          <div key={categoria}>
            <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-6 border-b border-white/10 pb-2">
              {CATEGORIAS[categoria as FuenteItem['categoria']]}
            </h2>
            <div className="space-y-6">
              {items.map((fuente) => (
                <a
                  key={fuente.nombre}
                  href={fuente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition"
                >
                  {/* Logo */}
                  <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-1.5">
                    <img
                      src={fuente.logo}
                      alt={`Logo de ${fuente.nombre}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  {/* Texto */}
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-white leading-snug">
                      {fuente.nombre}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      {fuente.descripcion}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Nota final ── */}
      <div className="mt-16 text-center text-xs text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
        <p>
          Todos los contenidos se utilizan con fines educativos y de
          concientización pública. Las imágenes de Wikimedia Commons y los
          sonidos de Freesound y Pixabay se distribuyen bajo licencias
          Creative Commons o de dominio público.
        </p>
      </div>
    </ViewContainer>
  )
}