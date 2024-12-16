import { api } from '@/src/lib/axios'
import { AnimalCategory } from '@/src/utils/data/animals'
import { useQuery } from '@tanstack/react-query'

async function fetchAnimalCategories() {
  const { data } = await api.get('/categorias-animais')

  return data
}

export function useGETAnimalCategories() {
  const query = useQuery<AnimalCategory[]>({
    queryKey: ['animalCategoriesList'],
    queryFn: async () => await fetchAnimalCategories(),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in miliseconds
  })

  const animalCategoriesCount = query.data?.length

  return { query, animalCategoriesCount }
}
