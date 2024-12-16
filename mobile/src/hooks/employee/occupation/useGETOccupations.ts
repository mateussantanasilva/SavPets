import { api } from '@/src/lib/axios'
import { OccupationDTO } from '@/src/schemas/occupationSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchOccupations() {
  const { data } = await api.get<OccupationDTO[]>('/cargos')

  const formattedOccupations = data.map((occupation) => {
    if (occupation.description.length > 165)
      return {
        ...occupation,
        description: occupation.description.slice(0, 165).concat('...'),
      }

    return { ...occupation }
  })

  return formattedOccupations
}

export function useGETOccupations() {
  const query = useQuery<OccupationDTO[]>({
    queryKey: ['occupationList'],

    queryFn: fetchOccupations,
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  const occupationCount = query.data?.length

  return { ...query, occupationCount }
}
