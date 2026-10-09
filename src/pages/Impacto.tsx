import ViewContainer from '../components/ui/ViewContainer'
import ImpactoSociocultural from '../components/impacto/ImpactoSociocultural'
import GastoCard from '../components/impacto/GastoCard'
import ParadojaCard from '../components/impacto/ParadojaCard'
import ConfianzaCard from '../components/impacto/ConfianzaCard'
import { getCardsImpacto } from '../data/services/impacto.service'

export default function Impacto() {
  const cards = getCardsImpacto()

  const renderCard = (id: string) => {
    const card = cards.find((c) => c.id === id)
    if (!card) return null

    switch (id) {
      case 'impacto_sociocultural':
        return <ImpactoSociocultural key={id} card={card} />
      case 'gasto_sistema':
        return <GastoCard key={id} card={card} />
      case 'paradoja_inversion':
        return <ParadojaCard key={id} card={card} />
      case 'erosion_confianza':
        return <ConfianzaCard key={id} card={card} />
      default:
        return null
    }
  }

  return (
    <ViewContainer title="Impacto" color="orange">
      <p className="text-lg mb-8 text-slate-900">
        ¿Qué pasa cuando no sabemos? El impacto no es solo humano: también es
        económico, social y estructural. Estos son los cuatro frentes donde la
        desinformación cardiovascular deja su marca.
      </p>

      <div className="space-y-8">
        {renderCard('impacto_sociocultural')}
        {renderCard('gasto_sistema')}
        {renderCard('paradoja_inversion')}
        {renderCard('erosion_confianza')}
      </div>
    </ViewContainer>
  )
}