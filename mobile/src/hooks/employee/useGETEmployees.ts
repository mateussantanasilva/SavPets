import { api } from '@/src/lib/axios'
import { EmployeeDTO } from '@/src/schemas/employeeSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchEmployess() {
  const { data } = await api.get('/funcionarios')

  return data
}

export function useGETEmployess() {
  const query = useQuery<EmployeeDTO[]>({
    queryKey: ['employeesList'],

    queryFn: async () => await fetchEmployess(),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  const employessCount = query.data?.length

  return { ...query, employessCount }
}
