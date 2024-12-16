import { api } from '@/src/lib/axios'
import { ClientDTO } from '@/src/schemas/clientSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchClients() {
  const { data } = await api.get('/clientes')

  return data
}

export function useGETClients() {
  const query = useQuery<ClientDTO[]>({
    queryKey: ['clientsList'],

    queryFn: async () => await fetchClients(),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  const clientsCount = query.data?.length

  return { ...query, clientsCount }
}
