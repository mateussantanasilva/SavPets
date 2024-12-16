import { api } from '@/src/lib/axios'
import { OccupationSchema } from '@/src/schemas/occupationSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedOccupation: OccupationSchema
}

async function updateOccupation({ id, updatedOccupation }: UpdateProps) {
  try {
    await api.put(`/cargos/${id}`, updatedOccupation)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTOccupation() {
  const mutation = useMutation({
    mutationFn: updateOccupation,
  })

  return mutation
}
