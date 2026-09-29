import { Link } from 'react-router'
import ViewContainer from '../components/ui/ViewContainer'

export default function NotFound() {
  return (
    <ViewContainer title="404 — Página no encontrada" color="zinc">
      <p>
        La ruta a la que intentaste acceder no existe. Puede que hayas escrito
        mal la dirección o que el enlace esté roto.
      </p>
      <p className="pt-4">
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-lg bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition"
        >
          ← Volver al inicio
        </Link>
      </p>
    </ViewContainer>
  )
}