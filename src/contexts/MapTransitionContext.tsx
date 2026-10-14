import { createContext, useContext } from 'react'

interface MapTransitionContextValue {
  startMapTransition: () => void
}

export const MapTransitionContext = createContext<MapTransitionContextValue>({
  startMapTransition: () => {},
})

export const useMapTransition = () => useContext(MapTransitionContext)