import { api } from '@/src/lib/axios'
import { ProviderDTO } from '@/src/schemas/providerSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchProvider(id: string) {
  const { data } = await api.get(`/fornecedores/${id}`)

  return data
}

export function useGETProviderById(id: string) {
  const query = useQuery<ProviderDTO>({
    queryKey: ['provider', id],

    queryFn: async () => await fetchProvider(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
