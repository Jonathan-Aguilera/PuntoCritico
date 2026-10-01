import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../config/firebase'

const SESSION_KEY = 'db_connection_tested'

export async function checkDatabaseConnectionOnce() {
  // Evitar que se ejecute más de una vez en la misma sesión del navegador
  if (sessionStorage.getItem(SESSION_KEY)) {
    return
  }

  // Marcar como probado antes de la llamada para evitar condiciones de carrera o recursividad
  sessionStorage.setItem(SESSION_KEY, 'true')

  try {
    // Consulta ligera de prueba a Firestore
    const q = query(collection(db, 'status'), limit(1))
    await getDocs(q)
    console.log('✅ Éxito: Conexión con la base de datos establecida correctamente.')
  } catch (error) {
    console.error('❌ Error de aviso: No se pudo establecer conexión con la base de datos.', error)
  }
}
