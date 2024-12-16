import { api } from '@/src/lib/axios'
import { AnimalCategorySchema } from '@/src/schemas/animalCategorySchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createAnimalCategory(newAnimalCategory: AnimalCategorySchema) {
  try {
    await api.post('/categorias-animais', newAnimalCategory)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTAnimalCategory() {
  const mutation = useMutation({
    mutationFn: createAnimalCategory,
  })

  return mutation
}
