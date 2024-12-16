import { api } from '@/src/lib/axios'
import { MedicineSchema } from '@/src/schemas/medicineSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createMedicine(newMedicine: MedicineSchema) {
  try {
    await api.post('/medicamentos', newMedicine)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTMedicine() {
  const mutation = useMutation({
    mutationFn: createMedicine,
  })

  return mutation
}
