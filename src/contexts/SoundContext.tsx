import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface SoundContextValue {
  musicEnabled: boolean
  sfxEnabled: boolean
  toggleMusic: () => void
  toggleSfx: () => void
  /** Reproduce un efecto si SFX está activo */
  playSfx: (playFn: () => void) => void
  /** Precarga/control de la música */
  musicVolume: number
}

const SoundContext = createContext<SoundContextValue | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [sfxEnabled, setSfxEnabled] = useState(true)
  const [musicVolume, setMusicVolume] = useState(0.3)

  const toggleMusic = useCallback(() => {
    setMusicEnabled((prev) => !prev)
  }, [])

  const toggleSfx = useCallback(() => {
    setSfxEnabled((prev) => !prev)
  }, [])

  const playSfx = useCallback(
    (playFn: () => void) => {
      if (sfxEnabled) playFn()
    },
    [sfxEnabled]
  )

  return (
    <SoundContext.Provider
      value={{
        musicEnabled,
        sfxEnabled,
        toggleMusic,
        toggleSfx,
        playSfx,
        musicVolume,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound debe usarse dentro de SoundProvider')
  return ctx
}