import { api } from '@/src/lib/axios'
import { NewUserCredentialsSchema } from '@/src/schemas/authSchema'
import { saveUserSession } from '@/src/storages/auth'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function registerUser(newUser: NewUserCredentialsSchema) {
  try {
    const { data } = await api.post('/criar-cadastro', newUser)

    await saveUserSession(data)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useRegister() {
  const mutation = useMutation({
    mutationFn: registerUser,
  })

  return mutation
}
