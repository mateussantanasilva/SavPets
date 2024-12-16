import { api } from '@/src/lib/axios'
import { ClientDTO } from '@/src/schemas/clientSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchClient(id: string) {
  const { data } = await api.get(`/clientes/${id}`)

  return data
}

export function useGETClientById(id: string) {
  const query = useQuery<ClientDTO>({
    queryKey: ['client', id],

    queryFn: async () => await fetchClient(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
