import { api } from '@/src/lib/axios'
import { ClientSchema } from '@/src/schemas/clientSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createClient(newClient: ClientSchema) {
  try {
    await api.post('/clientes', newClient)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTClient() {
  const mutation = useMutation({
    mutationFn: createClient,
  })

  return mutation
}
