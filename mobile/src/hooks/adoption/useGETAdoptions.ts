import { api } from '@/src/lib/axios'
import { AdoptionDTO } from '@/src/schemas/adoptionSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchAdoptions() {
  const { data } = await api.get('/adocao')

  return data
}

export function useGETAdoptions() {
  const query = useQuery<AdoptionDTO[]>({
    queryKey: ['adoptionsList'],

    queryFn: async () => await fetchAdoptions(),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  const adoptionsCount = query.data?.length

  return { ...query, adoptionsCount }
}
