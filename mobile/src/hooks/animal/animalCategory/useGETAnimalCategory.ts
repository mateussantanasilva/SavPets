import { api } from '@/src/lib/axios'
import { AnimalCategory } from '@/src/utils/data/animals'
import { useQuery } from '@tanstack/react-query'

async function fetchAnimalCategory(id: string) {
  const { data } = await api.get(`/categorias-animais/${id}`)

  return data
}

export function useGETAnimalCategory(id: string) {
  const query = useQuery<AnimalCategory>({
    queryKey: ['animalCategory', id],
    queryFn: async () => await fetchAnimalCategory(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in miliseconds
  })

  return query
}
