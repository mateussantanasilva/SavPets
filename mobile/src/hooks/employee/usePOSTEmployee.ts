import { api } from '@/src/lib/axios'
import { EmployeeSchema } from '@/src/schemas/employeeSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createEmployee(newEmployee: EmployeeSchema) {
  try {
    await api.post('/funcionarios', newEmployee)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTEmployee() {
  const mutation = useMutation({
    mutationFn: createEmployee,
  })

  return mutation
}
