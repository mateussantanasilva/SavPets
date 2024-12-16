import { api } from '@/src/lib/axios'
import { OccupationSchema } from '@/src/schemas/occupationSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createOccupation(newOccupation: OccupationSchema) {
  try {
    await api.post('/cargos', newOccupation)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTOccupation() {
  const mutation = useMutation({
    mutationFn: createOccupation,
  })

  return mutation
}
