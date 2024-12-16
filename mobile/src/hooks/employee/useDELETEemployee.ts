import { api } from '@/src/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function deleteEmployee(id: string) {
  try {
    await api.delete(`/funcionarios/${id}`)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useDELETEEmployee() {
  const mutation = useMutation({
    mutationFn: deleteEmployee,
  })

  return mutation
}
