import { api } from '@/src/lib/axios'
import { UpdatedUserCredentialsSchema } from '@/src/schemas/authSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function changePassword(
  updatedCredentials: UpdatedUserCredentialsSchema,
) {
  try {
    await api.post('/alterar-senha', updatedCredentials)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useChangePassword() {
  const mutation = useMutation({
    mutationFn: changePassword,
  })

  return mutation
}
