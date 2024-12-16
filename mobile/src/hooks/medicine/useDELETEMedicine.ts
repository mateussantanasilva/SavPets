import { api } from '@/src/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function deleteMedicine(id: string) {
  try {
    await api.delete(`/medicamentos/${id}`)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useDELETEMedicine() {
  const mutation = useMutation({
    mutationFn: deleteMedicine,
  })

  return mutation
}
