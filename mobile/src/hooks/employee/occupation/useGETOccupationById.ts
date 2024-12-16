import { api } from '@/src/lib/axios'
import { OccupationDTO } from '@/src/schemas/occupationSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchOccupation(id: string) {
  const { data } = await api.get(`/cargos/${id}`)

  return data
}

export function useGETOccupationById(id: string) {
  const query = useQuery<OccupationDTO>({
    queryKey: ['occupation', id],

    queryFn: async () => fetchOccupation(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
