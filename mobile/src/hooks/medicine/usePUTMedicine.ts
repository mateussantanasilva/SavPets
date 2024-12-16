import { api } from '@/src/lib/axios'
import { MedicineSchema } from '@/src/schemas/medicineSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedMedicine: MedicineSchema
}

async function updateMedicine({ id, updatedMedicine }: UpdateProps) {
  try {
    await api.put(`/medicamentos/${id}`, updatedMedicine)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTMedicine() {
  const mutation = useMutation({
    mutationFn: updateMedicine,
  })

  return mutation
}
