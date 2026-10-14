import CardShell from './CardShell'
import type { CardImpacto } from '../../data/services/impacto.service'

interface Props {
  card: CardImpacto
  index?: number
}

export default function ConfianzaCard({ card, index = 0 }: Props) {
  const datos = card.datos as {
    rechazo_estatinas_por_desinformacion: number
    percepcion_aumento_rechazo: number
    confianza_sistema_salud: number
    calificacion_sistema_bueno: number
    caida_desde_2018: number
    no_puede_pagar_buena_atencion: number
    expuestos_mensajes_anti_vacuna: number
    desarrollo_dudas_por_mensajes: number
    confianza_autoridades_sin_afectacion: number
    confianza_autoridades_con_dudas: number
    nota: string
  }

  return (
    <CardShell
      titulo={card.titulo}
      subtitulo={card.subtitulo}
      descripcion={card.descripcion}
      index={index}
    >
      {/* Grid de números grandes con 4 tintes distintos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#C4A3FF]/10 border border-[#C4A3FF]/30 rounded-xl p-5 text-center">
          <p className="text-3xl md:text-4xl font-bold text-[#D4B8FF]">
            {datos.rechazo_estatinas_por_desinformacion}%
          </p>
          <p className="text-xs text-[#E5D6FF] mt-2 leading-tight">
            rechazo a estatinas por desinformación digital
          </p>
        </div>
        <div className="bg-[#C4A3FF]/10 border border-[#C4A3FF]/30 rounded-xl p-5 text-center">
          <p className="text-3xl md:text-4xl font-bold text-[#D4B8FF]">
            {datos.percepcion_aumento_rechazo}%
          </p>
          <p className="text-xs text-[#E5D6FF] mt-2 leading-tight">
            percibió un aumento reciente del rechazo
          </p>
        </div>
        <div className="bg-[#B8AEFF]/10 border border-[#B8AEFF]/30 rounded-xl p-5 text-center">
          <p className="text-3xl md:text-4xl font-bold text-[#C8C0FF]">
            {datos.no_puede_pagar_buena_atencion}%
          </p>
          <p className="text-xs text-[#DDD6FF] mt-2 leading-tight">
            cree que muchos no pueden pagar buena atención
          </p>
        </div>
        <div className="bg-[#8B7FE8]/15 border border-[#8B7FE8]/40 rounded-xl p-5 text-center">
          <p className="text-3xl md:text-4xl font-bold text-[#B8AEFF]">
            {datos.expuestos_mensajes_anti_vacuna}%
          </p>
          <p className="text-xs text-[#D0C8FF] mt-2 leading-tight">
            expuesto a mensajes que cuestionan las vacunas
          </p>
        </div>
      </div>

      {/* Comparación de confianza con tintes verde menta vs violeta */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[#A5F3EA] mb-5 text-center">
          La confianza institucional como factor protector
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-[#5DD9A8]">
              {datos.confianza_autoridades_sin_afectacion}%
            </p>
            <p className="text-xs text-[#B0EED6] mt-2 leading-tight">
              confía en las autoridades
              <br />
              <span className="font-semibold">
                entre quienes no tuvieron dudas
              </span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-[#C4A3FF]">
              {datos.confianza_autoridades_con_dudas}%
            </p>
            <p className="text-xs text-[#E5D6FF] mt-2 leading-tight">
              confía en las autoridades
              <br />
              <span className="font-semibold">
                entre quienes sí tuvieron dudas
              </span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#A5F3EA]/60 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}