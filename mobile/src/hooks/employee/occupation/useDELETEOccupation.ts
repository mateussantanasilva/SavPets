import { api } from '@/src/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function deleteOccupation(id: string) {
  try {
    await api.delete(`/cargos/${id}`)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useDELETEOccupation() {
  const mutation = useMutation({
    mutationFn: deleteOccupation,
  })

  return mutation
}
