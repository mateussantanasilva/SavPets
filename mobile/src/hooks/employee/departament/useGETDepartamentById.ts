import { api } from '@/src/lib/axios'
import { DepartamentDTO } from '@/src/schemas/departamentSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchDepartament(id: string) {
  const { data } = await api.get(`/departamentos/${id}`)

  return data
}

export function useGETDepartamentById(id: string) {
  const query = useQuery<DepartamentDTO>({
    queryKey: ['departament', id],

    queryFn: async () => await fetchDepartament(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
