import { useEffect, useRef } from 'react'
import { useSound } from '../../contexts/SoundContext'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { musicEnabled, musicVolume } = useSound()

  useEffect(() => {
    // Solo creamos el audio cuando el usuario activa la música
    // y solo si el archivo existe (lo validamos una sola vez)
    if (!musicEnabled) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      return
    }

    if (!audioRef.current) {
      const audio = new Audio('/sounds/music/space-ambient.mp3')
      audio.loop = true
      audio.volume = musicVolume

      // Si el archivo no existe, no rompe pero no suena
      audio.addEventListener('error', () => {
        console.warn('[BackgroundMusic] No se encontró el archivo de música.')
      })

      audioRef.current = audio
    }

    const audio = audioRef.current
    audio.volume = musicVolume

    audio.play().catch((err) => {
      console.warn('Autoplay bloqueado:', err)
    })
  }, [musicEnabled, musicVolume])

  return null
}