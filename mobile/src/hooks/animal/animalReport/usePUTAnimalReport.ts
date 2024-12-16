import { api } from '@/src/lib/axios'
import { AnimalReportSchema } from '@/src/schemas/animalReportSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedAnimalReport: AnimalReportSchema
}

async function updateAnimalReport({ id, updatedAnimalReport }: UpdateProps) {
  try {
    await api.put(`/relatorio-animais/${id}`, updatedAnimalReport)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTAnimalReport() {
  const mutation = useMutation({
    mutationFn: updateAnimalReport,
  })

  return mutation
}
