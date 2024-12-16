import { useMutation } from '@tanstack/react-query'
import { api } from '@/src/lib/axios'
import { AnimalCategorySchema } from '@/src/schemas/animalCategorySchema'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedAnimalCategory: AnimalCategorySchema
}

async function updateAnimalCategory({
  id,
  updatedAnimalCategory,
}: UpdateProps) {
  try {
    await api.put(`/categorias-animais/${id}`, updatedAnimalCategory)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTAnimalCategory() {
  const mutation = useMutation({
    mutationFn: updateAnimalCategory,
  })

  return mutation
}
