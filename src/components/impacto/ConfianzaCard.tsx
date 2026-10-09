import CardShell from './CardShell'
import type { CardImpacto } from '../../data/services/impacto.service'

export default function ConfianzaCard({ card }: { card: CardImpacto }) {
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
    >
      {/* Grid de números grandes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-purple-50 rounded-xl p-5 text-center">
          <p className="text-3xl md:text-4xl font-bold text-purple-700">
            {datos.rechazo_estatinas_por_desinformacion}%
          </p>
          <p className="text-xs text-slate-600 mt-2 leading-tight">
            rechazo a estatinas por desinformación digital
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-5 text-center">
          <p className="text-3xl md:text-4xl font-bold text-purple-700">
            {datos.percepcion_aumento_rechazo}%
          </p>
          <p className="text-xs text-slate-600 mt-2 leading-tight">
            percibió un aumento reciente del rechazo
          </p>
        </div>
        <div className="bg-red-50 rounded-xl p-5 text-center">
          <p className="text-3xl md:text-4xl font-bold text-red-700">
            {datos.no_puede_pagar_buena_atencion}%
          </p>
          <p className="text-xs text-slate-600 mt-2 leading-tight">
            cree que muchos no pueden pagar buena atención
          </p>
        </div>
        <div className="bg-orange-50 rounded-xl p-5 text-center">
          <p className="text-3xl md:text-4xl font-bold text-orange-700">
            {datos.expuestos_mensajes_anti_vacuna}%
          </p>
          <p className="text-xs text-slate-600 mt-2 leading-tight">
            expuesto a mensajes que cuestionan las vacunas
          </p>
        </div>
      </div>

      {/* Comparación de confianza */}
      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-5 text-center">
          La confianza institucional como factor protector
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-emerald-600">
              {datos.confianza_autoridades_sin_afectacion}%
            </p>
            <p className="text-xs text-slate-600 mt-2 leading-tight">
              confía en las autoridades
              <br />
              <span className="font-semibold">entre quienes no tuvieron dudas</span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-red-600">
              {datos.confianza_autoridades_con_dudas}%
            </p>
            <p className="text-xs text-slate-600 mt-2 leading-tight">
              confía en las autoridades
              <br />
              <span className="font-semibold">entre quienes sí tuvieron dudas</span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}