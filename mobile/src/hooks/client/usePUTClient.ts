import { api } from '@/src/lib/axios'
import { ClientSchema } from '@/src/schemas/clientSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedClient: ClientSchema
}

async function updateClient({ id, updatedClient }: UpdateProps) {
  try {
    await api.put(`/clientes/${id}`, updatedClient)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTClient() {
  const mutation = useMutation({
    mutationFn: updateClient,
  })

  return mutation
}
