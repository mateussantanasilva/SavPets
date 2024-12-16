import { api } from '@/src/lib/axios'
import { EmployeeSchema } from '@/src/schemas/employeeSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedEmployee: EmployeeSchema
}

async function updatedEmployee({ id, updatedEmployee }: UpdateProps) {
  try {
    await api.put(`/funcionarios/${id}`, updatedEmployee)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTEmployee() {
  const mutation = useMutation({
    mutationFn: updatedEmployee,
  })

  return mutation
}
