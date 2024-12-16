import { api } from '@/src/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function deleteClient(id: string) {
  try {
    await api.delete(`/clientes/${id}`)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useDELETEClient() {
  const mutation = useMutation({
    mutationFn: deleteClient,
  })

  return mutation
}
