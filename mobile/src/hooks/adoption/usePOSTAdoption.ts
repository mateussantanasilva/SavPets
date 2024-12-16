import { api } from '@/src/lib/axios'
import { AdoptionSchema } from '@/src/schemas/adoptionSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createAdoption(newAdoption: AdoptionSchema) {
  try {
    await api.post('/adocao', newAdoption)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTAdoption() {
  const mutation = useMutation({
    mutationFn: createAdoption,
  })

  return mutation
}
