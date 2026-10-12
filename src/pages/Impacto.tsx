import ViewContainer from '../components/ui/ViewContainer'
import ImpactoSociocultural from '../components/impacto/ImpactoSociocultural'
import GastoCard from '../components/impacto/GastoCard'
import ParadojaCard from '../components/impacto/ParadojaCard'
import ConfianzaCard from '../components/impacto/ConfianzaCard'
import { getCardsImpacto } from '../data/services/impacto.service'

export default function Impacto() {
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

  return (
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1 className="font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
          Impacto
        </h1>
      </section>

      {/* ── Subtítulo ── */}
      <p className="text-center text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-16 leading-relaxed">
        ¿Qué pasa cuando no sabemos? El impacto no es solo humano: también es
        económico, social y estructural. Estos son los cuatro frentes donde la
        desinformación cardiovascular deja su marca.
      </p>

      {/* ── Las 4 cards ── */}
      <div className="space-y-8">
        {renderCard('impacto_sociocultural', 0)}
        {renderCard('gasto_sistema', 1)}
        {renderCard('paradoja_inversion', 2)}
        {renderCard('erosion_confianza', 3)}
      </div>
    </ViewContainer>
  )
}