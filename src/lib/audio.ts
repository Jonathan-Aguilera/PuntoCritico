/**
 * Helper de audio basado en HTMLAudioElement.
 * Evita los problemas de AudioContext de Howler/use-sound.
 */

// Caché de audios por URL
const cache: Record<string, HTMLAudioElement> = {}

export function getAudio(src: string, volume = 0.5): HTMLAudioElement {
  if (!cache[src]) {
    const audio = new Audio(src)
    audio.volume = volume
    audio.preload = 'auto'
    cache[src] = audio
  } else {
    // Actualizamos el volumen en caso de que haya cambiado
    cache[src].volume = volume
  }
  return cache[src]
}

export function playSfx(src: string, volume = 0.5): void {
  try {
    const base = getAudio(src, volume)
    // Clonamos el nodo para permitir reproducciones solapadas
    // (si reproducís hover 3 veces seguidas, no querés que la anterior corte a la nueva)
    const clone = base.cloneNode(true) as HTMLAudioElement
    clone.volume = volume
    clone.play().catch((err) => {
      console.warn(`[audio] No se pudo reproducir ${src}:`, err.message)
    })
  } catch (err) {
    console.warn(`[audio] Error creando audio ${src}:`, err)
  }
}