import { api } from '@/src/lib/axios'
import { DepartamentSchema } from '@/src/schemas/departamentSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedDepartament: DepartamentSchema
}

async function updateDepartament({ id, updatedDepartament }: UpdateProps) {
  try {
    await api.put(`/departamentos/${id}`, updatedDepartament)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTDepartament() {
  const mutation = useMutation({
    mutationFn: updateDepartament,
  })

  return mutation
}
