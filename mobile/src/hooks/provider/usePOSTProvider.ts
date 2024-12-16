import { api } from '@/src/lib/axios'
import { ProviderSchema } from '@/src/schemas/providerSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createProvider(newProvider: ProviderSchema) {
  try {
    await api.post('/fornecedores', newProvider)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTProvider() {
  const mutation = useMutation({
    mutationFn: createProvider,
  })

  return mutation
}
