import { useMutation } from '@tanstack/react-query'
import { api } from '@/src/lib/axios'
import { AxiosError } from 'axios'

async function deleteAnimalCategory(id: string) {
  try {
    return await api.delete(`/categorias-animais/${id}`)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useDELETEAnimalCategory() {
  const mutation = useMutation({
    mutationFn: deleteAnimalCategory,
  })

  return mutation
}
