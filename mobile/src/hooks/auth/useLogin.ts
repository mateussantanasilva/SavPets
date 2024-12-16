import { api } from '@/src/lib/axios'
import { UserCredentialsSchema } from '@/src/schemas/authSchema'
import { saveUserSession } from '@/src/storages/auth'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function login(userCredentials: UserCredentialsSchema) {
  try {
    const { data } = await api.post('/login', userCredentials)

    await saveUserSession(data)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useLogin() {
  const mutation = useMutation({
    mutationFn: login,
  })

  return mutation
}
