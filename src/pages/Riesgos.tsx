import ViewContainer from '../components/ui/ViewContainer'
import RiesgoCard from '../components/riesgo/RiesgoCard'
import { getFactores } from '../data/services/riesgos.service'

export default function Riesgos() {
  const factores = getFactores()

  return (
    <ViewContainer title="Riesgos" color="red">
      <p className="text-lg mb-8 text-slate-900">
        ¿Sabías que la mayoría de los problemas del corazón se desarrollan en
        silencio? Estos son los factores que más influyen en la salud
        cardiovascular de los argentinos.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {factores.map((factor) => (
          <RiesgoCard key={factor.id} factor={factor} accentColor="#dc2626" />
        ))}
      </div>
    </ViewContainer>
  )
}