import { api } from '@/src/lib/axios'
import { AdoptionDTO } from '@/src/schemas/adoptionSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchAdoption(id: string) {
  const { data } = await api.get(`/adocao/${id}`)

  return data
}

export function useGETAdoptionById(id: string) {
  const query = useQuery<AdoptionDTO>({
    queryKey: ['adoption', id],

    queryFn: async () => await fetchAdoption(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
