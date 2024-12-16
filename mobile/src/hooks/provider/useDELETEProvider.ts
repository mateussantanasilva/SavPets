import { api } from '@/src/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function deleteProvider(id: string) {
  try {
    await api.delete(`/fornecedores/${id}`)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useDELETEProvider() {
  const mutation = useMutation({
    mutationFn: deleteProvider,
  })

  return mutation
}
