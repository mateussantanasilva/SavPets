import { api } from '@/src/lib/axios'
import { DepartamentDTO } from '@/src/schemas/departamentSchema'
import { EmployeeDTO } from '@/src/schemas/employeeSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchEmployee(id: string) {
  const { data } = await api.get(`/funcionarios/${id}`)

  return data
}

export function useGETEmployeeById(id: string) {
  const query = useQuery<EmployeeDTO>({
    queryKey: ['employee', id],

    queryFn: async () => await fetchEmployee(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
