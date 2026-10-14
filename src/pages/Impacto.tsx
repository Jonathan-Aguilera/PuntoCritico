import ViewContainer from '../components/ui/ViewContainer'
import ImpactoSociocultural from '../components/impacto/ImpactoSociocultural'
import GastoCard from '../components/impacto/GastoCard'
import ParadojaCard from '../components/impacto/ParadojaCard'
import ConfianzaCard from '../components/impacto/ConfianzaCard'
import { getCardsImpacto } from '../data/services/impacto.service'

interface ImpactoProps {
  preview?: boolean
}

export default function Impacto({ preview = false }: ImpactoProps) {
  const cards = getCardsImpacto()

  const renderCard = (id: string, index: number) => {
    const card = cards.find((c) => c.id === id)
    if (!card) return null

    switch (id) {
      case 'impacto_sociocultural':
        return <ImpactoSociocultural key={id} card={card} index={index} />
      case 'gasto_sistema':
        return <GastoCard key={id} card={card} index={index} />
      case 'paradoja_inversion':
        return <ParadojaCard key={id} card={card} index={index} />
      case 'erosion_confianza':
        return <ConfianzaCard key={id} card={card} index={index} />
      default:
        return null
    }
  }

  const cardsAMostrar = preview
    ? ['impacto_sociocultural', 'gasto_sistema', 'paradoja_inversion']
    : [
        'impacto_sociocultural',
        'gasto_sistema',
        'paradoja_inversion',
        'erosion_confianza',
      ]

  return (
    <ViewContainer>
      {/* ── Título ── */}
      <section className="text-center mb-6">
        <h1
          className={`font-bold leading-[1.1] tracking-tight bg-linear-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent ${
            preview
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
          }`}
        >
          Lo que está costando
        </h1>
      </section>

      {/* ── Subtítulo en cian ── */}
      <p className="text-center text-base md:text-lg text-[#A5F3EA] max-w-3xl mx-auto mb-16 leading-relaxed">
        El impacto no es solo humano: también es económico, social y
        estructural. Y empieza en un lugar incómodo: en lo que creemos saber.
        Estas son las caras de un problema que nos afecta a todos, todos los
        días.
      </p>

      {/* ── Cards ── */}
      <div className="space-y-8">
        {cardsAMostrar.map((id, i) => renderCard(id, i))}
      </div>

      {/* ── Conclusión ── */}
      <section className="mt-20 max-w-3xl mx-auto">
        <div className="h-px bg-[#4ECDC4]/20 mb-10 mx-auto w-24" />
        <p className="text-base md:text-lg text-[#A5F3EA] leading-relaxed text-justify mb-4">
          Detrás de cada número hay una persona. Alguien que no llegó a tiempo.
          Alguien que no sabía. Alguien que hubiera querido saber. La
          enfermedad cardiovascular no elige barrios, ni clases sociales, ni
          edades. Ocurre todos los días, en cada provincia, en cada familia.
        </p>
        <p className="text-base md:text-lg text-[#A5F3EA] font-semibold text-center mt-6">
          ¿Estamos dispuestos a cambiar el cómo pensamos y actuamos para reducir
          este impacto?
        </p>
      </section>

      {/* ── CTA solo en preview ── */}
      {preview && (
        <div className="text-center mt-12">
          <a
            href="/impacto"
            className="inline-block px-6 py-3 border border-[#4ECDC4]/40 text-[#4ECDC4] font-semibold rounded-lg hover:bg-[#4ECDC4]/10 transition"
          >
            Ver el impacto completo →
          </a>
        </div>
      )}
    </ViewContainer>
  )
}