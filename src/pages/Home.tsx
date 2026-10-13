import { Link } from 'react-router'
import Riesgos from './Riesgos'
import Impacto from './Impacto'
import Acceso from './Acceso'
import Habitos from './Habitos'
import Soluciones from './Soluciones'
import Historias from './Historias'

export default function Home() {
  return (
    <div className="size-full">
      <div className="w-full px-4 py-10 md:py-16 flex flex-col gap-8">

        {/* ─── Bloque 1: La pregunta ─── */}
        <section className="w-full max-w-[1400px] mx-auto px-2 md:px-6 py-8 md:py-12 text-center">
          <h1 className="font-['Orbitron'] font-bold leading-[1.15] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-3 text-center bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
            ¿Por qué seguimos muriendo de lo que ya sabemos prevenir?
          </h1>
        </section>

        {/* ─── Bloque 2: La "carpeta" con toda la info ─── */}
        <section className="w-full max-w-[1400px] mx-auto px-4">
          <div className="relative">

            {/* Pestaña tipo folder */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 border-b-0 px-5 py-2 rounded-t-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BA8D9]" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#7BA8D9]">
                Punto Crítico
              </span>
            </div>

            {/* Cuerpo de la carpeta: puntas rectas */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-none px-6 md:px-10 py-8 md:py-10 shadow-xl">

              {/* Intro */}
              <p className="text-slate-200 leading-relaxed text-sm md:text-base mb-8">
                Un recorrido visual por la salud cardiovascular argentina. Los
                datos están. La información también. Lo que falta es mirarlos de
                frente y decidir qué hacemos con ellos.
              </p>

              {/* Separador */}
              <div className="h-px bg-white/10 mb-8" />

              {/* ¿De qué hablamos...? */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                ¿De qué hablamos cuando hablamos del corazón?
              </h3>
              <p className="text-slate-200 leading-relaxed text-sm md:text-base mb-4">
                Las enfermedades cardiovasculares son la primera causa de muerte
                en Argentina. Más del 27% de todas las muertes del país se deben
                a problemas del corazón o de los vasos sanguíneos.
              </p>
              <p className="text-slate-200 leading-relaxed text-sm md:text-base mb-8">
                Y sin embargo, hasta el 80% de esos eventos podrían prevenirse
                con hábitos saludables, controles periódicos y acceso a
                información confiable.
              </p>

              {/* Separador */}
              <div className="h-px bg-white/10 mb-8" />

              {/* Qué vas a encontrar */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                Qué vas a encontrar
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  { titulo: 'Riesgos', desc: 'Los factores que más afectan al corazón argentino.' },
                  { titulo: 'Impacto', desc: 'Lo que cuesta, en vidas y en dinero, no prevenir.' },
                  { titulo: 'Acceso', desc: 'Un siglo de cambios en cómo llega la información.' },
                  { titulo: 'Hábitos', desc: 'Mitos y realidades sobre el cuidado cotidiano.' },
                  { titulo: 'Soluciones', desc: 'Pequeños cambios que hacen una gran diferencia.' },
                  { titulo: 'Historias', desc: 'Voces reales y un homenaje a quienes abrieron camino.' },
                ].map((item) => (
                  <li
                    key={item.titulo}
                    className="bg-white/5 rounded-sm px-4 py-3 border border-white/5"
                  >
                    <p className="text-amber-300 font-semibold text-sm mb-1">
                      {item.titulo}
                    </p>
                    <p className="text-slate-300 text-xs leading-snug">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Separador */}
              <div className="h-px bg-white/10 mb-8" />

              {/* CTA al mapa */}
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400/30 px-6 md:px-10 py-8 md:py-10 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Explorá los datos por tu cuenta
                </h3>
                <p className="text-slate-100 text-sm md:text-base mb-6 max-w-xl mx-auto">
                  Filtrá por provincia, año y factor de riesgo. Encontrá tu
                  propio punto crítico.
                </p>
                <Link
                  to="/mapa"
                  className="inline-block px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition shadow-lg"
                >
                  Abrir el mapa interactivo →
                </Link>
              </div>

            </div>
          </div>
        </section>

        <section>
          <Riesgos preview />
        </section>

        <section>
          <Impacto preview />
        </section>

        <section>
          <Acceso preview />
        </section>

        <section>
          <Habitos preview />
        </section>

        <section>
          <Soluciones preview />
        </section>

        <section>
          <Historias preview />
        </section>

        <section>
          {/* CTA al mapa */}
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400/30 px-6 md:px-10 py-8 md:py-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Explorá los datos por tu cuenta
            </h3>
            <p className="text-slate-100 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Filtrá por provincia, año y factor de riesgo. Encontrá tu
              propio punto crítico.
            </p>
            <Link
              to="/mapa"
              className="inline-block px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition shadow-lg"
            >
              Abrir el mapa interactivo →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}