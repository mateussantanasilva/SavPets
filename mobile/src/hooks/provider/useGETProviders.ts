import { api } from '@/src/lib/axios'
import { ProviderDTO } from '@/src/schemas/providerSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchProviders() {
  const { data } = await api.get('/fornecedores')

  return data
}

export function useGETProviders() {
  const query = useQuery<ProviderDTO[]>({
    queryKey: ['providersList'],

    queryFn: async () => await fetchProviders(),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  const providersCount = query.data?.length

  return { ...query, providersCount }
}
