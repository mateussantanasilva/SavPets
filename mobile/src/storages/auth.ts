import AsyncStorage from '@react-native-async-storage/async-storage'

export interface UserSessionProps {
  name: string
  surname: string
  email: string
  departament?: string | null
  occupation?: string | null
}

const STORAGE_AUTH_KEY = '@savpets:auth_user'

export async function getUserSession() {
  const storedUserSession = await AsyncStorage.getItem(STORAGE_AUTH_KEY)

  const userSession: UserSessionProps | null = storedUserSession
    ? JSON.parse(storedUserSession)
    : null

  return userSession
}

export async function saveUserSession(userSession: UserSessionProps) {
  await AsyncStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(userSession))
}

export async function deleteUserSession() {
  await AsyncStorage.removeItem(STORAGE_AUTH_KEY)
}
