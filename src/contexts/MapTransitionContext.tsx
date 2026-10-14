import { createContext, useContext } from 'react'

interface MapTransitionContextValue {
  startMapTransition: () => void
  startMapReturn: () => void
}

export const MapTransitionContext = createContext<MapTransitionContextValue>({
  startMapTransition: () => {},
  startMapReturn: () => {},
})

export const useMapTransition = () => useContext(MapTransitionContext)