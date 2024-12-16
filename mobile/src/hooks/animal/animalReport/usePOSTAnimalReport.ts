import { api } from '@/src/lib/axios'
import { AnimalReportSchema } from '@/src/schemas/animalReportSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createAnimalReport(newAnimalReport: AnimalReportSchema) {
  try {
    await api.post('/relatorio-animais', newAnimalReport)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTAnimalReport() {
  const mutation = useMutation({
    mutationFn: createAnimalReport,
  })

  return mutation
}
