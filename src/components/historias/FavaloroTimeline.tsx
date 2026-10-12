import { motion } from 'motion/react'
import type { FavaloroData } from '../../data/services/historias.service'

interface FavaloroTimelineProps {
  biografia: FavaloroData['biografia_resumida']
}

export default function FavaloroTimeline({ biografia }: FavaloroTimelineProps) {
  return (
    <section className="mb-16">
      <h3 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 text-center">
        Su vida, en cuatro etapas
      </h3>
      <p className="text-slate-300 text-center mb-10 text-sm md:text-base">
        De un barrio obrero de La Plata a los quirófanos más importantes del mundo.
      </p>

      {/* ── Desktop: horizontal ── */}
      <div className="hidden lg:block relative">
        {/* Línea horizontal */}
        <div className="absolute left-0 right-0 top-[13px] h-0.5 bg-white/20" />

        <div className="grid grid-cols-4 gap-6 relative">
          {biografia.map((etapa, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center"
            >
              <div className="w-7 h-7 rounded-full bg-[#7BA8D9] border-4 border-slate-900 shadow-md shadow-[#7BA8D9]/50 relative z-10 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{i + 1}</span>
              </div>
              <div className="w-0.5 h-6 bg-white/20" />
              <div className="mt-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-xl border-t-4 border-t-[#7BA8D9] w-full">
                <h4 className="font-bold text-amber-300 text-sm md:text-base leading-snug mb-2">
                  {etapa.etapa}
                </h4>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {etapa.texto}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Móvil/tablet: vertical ── */}
      <div className="lg:hidden relative pl-9">
        <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-white/20" />
        <div className="space-y-6">
          {biografia.map((etapa, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <div className="absolute -left-[32px] top-2 w-7 h-7 rounded-full bg-[#7BA8D9] border-4 border-slate-900 shadow-md shadow-[#7BA8D9]/50 z-10 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{i + 1}</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-xl border-l-4 border-l-[#7BA8D9]">
                <h4 className="font-bold text-amber-300 text-base mb-2">
                  {etapa.etapa}
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {etapa.texto}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}