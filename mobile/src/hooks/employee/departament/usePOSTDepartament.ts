import { api } from '@/src/lib/axios'
import { DepartamentSchema } from '@/src/schemas/departamentSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createDepartament(newDepartament: DepartamentSchema) {
  try {
    await api.post('/departamentos', newDepartament)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTDepartament() {
  const mutation = useMutation({
    mutationFn: createDepartament,
  })

  return mutation
}
