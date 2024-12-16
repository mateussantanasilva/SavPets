import { api } from '@/src/lib/axios'
import { AnimalReportDTO } from '@/src/schemas/animalReportSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchAnimalReport(id: string) {
  const { data } = await api.get(`/relatorio-animais/${id}`)

  return data
}

export function useGETAnimalReportById(id: string) {
  const query = useQuery<AnimalReportDTO>({
    queryKey: ['animalReport', id],

    queryFn: async () => await fetchAnimalReport(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
