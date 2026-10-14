import { motion } from 'motion/react'
import type { FavaloroData } from '../../data/services/historias.service'

interface FavaloroTimelineProps {
  biografia: FavaloroData['biografia_resumida']
}

export default function FavaloroTimeline({ biografia }: FavaloroTimelineProps) {
  return (
    <section className="mb-16">
      <h3 className="text-2xl md:text-3xl font-bold text-[#4ECDC4] mb-2 text-center">
        Su vida, en cuatro etapas
      </h3>
      <p className="text-[#A5F3EA]/75 text-center mb-10 text-sm md:text-base">
        De un barrio obrero de La Plata a los quirófanos más importantes del
        mundo.
      </p>

      {/* ── Desktop: horizontal ── */}
      <div className="hidden lg:block relative">
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
              <div
                className="w-7 h-7 rounded-full bg-white border-[3px] border-[#441ebd] relative z-10 flex items-center justify-center"
                style={{ boxShadow: '0 0 14px rgba(68, 30, 189, 0.5)' }}
              >
                <span className="text-[#441ebd] text-[10px] font-bold">
                  {i + 1}
                </span>
              </div>
              <div className="w-0.5 h-6 bg-white/20" />
              <div className="mt-2 bg-white/5 backdrop-blur-md border border-[#4ECDC4]/20 rounded-xl p-5 shadow-xl border-t-4 border-t-[#4ECDC4] w-full">
                <h4 className="font-bold text-[#4ECDC4] text-sm md:text-base leading-snug mb-2">
                  {etapa.etapa}
                </h4>
                <p className="text-xs md:text-sm text-[#A5F3EA] leading-relaxed">
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
              <div
                className="absolute -left-[32px] top-2 w-7 h-7 rounded-full bg-white border-[3px] border-[#441ebd] z-10 flex items-center justify-center"
                style={{ boxShadow: '0 0 14px rgba(68, 30, 189, 0.5)' }}
              >
                <span className="text-[#441ebd] text-[10px] font-bold">
                  {i + 1}
                </span>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-[#4ECDC4]/20 rounded-xl p-5 shadow-xl border-l-4 border-l-[#4ECDC4]">
                <h4 className="font-bold text-[#4ECDC4] text-base mb-2">
                  {etapa.etapa}
                </h4>
                <p className="text-sm text-[#A5F3EA] leading-relaxed">
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