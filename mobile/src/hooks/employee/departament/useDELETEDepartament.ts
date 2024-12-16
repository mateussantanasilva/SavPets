import { api } from '@/src/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function deleteDepartament(id: string) {
  try {
    await api.delete(`/departamentos/${id}`)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useDELETEDepartament() {
  const mutation = useMutation({
    mutationFn: deleteDepartament,
  })

  return mutation
}
