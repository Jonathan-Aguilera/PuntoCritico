import { createContext, useContext } from 'react'

interface IntroContextValue {
  introDone: boolean
}

export const IntroContext = createContext<IntroContextValue>({
  introDone: true,
})

export const useIntro = () => useContext(IntroContext)