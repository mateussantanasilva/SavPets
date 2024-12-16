import { api } from '@/src/lib/axios'
import { AnimalReportDTO } from '@/src/schemas/animalReportSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchAnimalReports() {
  const { data } = await api.get('/relatorio-animais')

  return data
}

export function useGETAnimalReports() {
  const query = useQuery<AnimalReportDTO[]>({
    queryKey: ['animalReportList'],

    queryFn: async () => await fetchAnimalReports(),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  const animalReportsCount = query.data?.length

  return { ...query, animalReportsCount }
}
