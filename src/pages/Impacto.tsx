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

  // En preview, solo mostramos las 2 primeras cards
  const cardsAMostrar = preview
    ? ['impacto_sociocultural', 'gasto_sistema']
    : ['impacto_sociocultural', 'gasto_sistema', 'paradoja_inversion', 'erosion_confianza']

  return (
    <ViewContainer>
      <section className="text-center mb-6">
        <h1
          className={`font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent ${
            preview
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
          }`}
        >
          Impacto
        </h1>
      </section>

      <p className="text-center text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-16 leading-relaxed">
        ¿Qué pasa cuando no sabemos? El impacto no es solo humano: también es
        económico, social y estructural.
      </p>

      <div className="space-y-8">
        {cardsAMostrar.map((id, i) => renderCard(id, i))}
      </div>

      {preview && (
        <div className="text-center mt-12">
          <a
            href="/impacto"
            className="inline-block px-6 py-3 border border-[#7BA8D9]/40 text-[#7BA8D9] font-semibold rounded-lg hover:bg-[#7BA8D9]/10 transition"
          >
            Ver el impacto completo →
          </a>
        </div>
      )}
    </ViewContainer>
  )
}