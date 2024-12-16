import { api } from '@/src/lib/axios'
import { AdoptionSchema } from '@/src/schemas/adoptionSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedAdoption: AdoptionSchema
}

async function updateAdoption({ id, updatedAdoption }: UpdateProps) {
  try {
    await api.put(`/adocao/${id}`, updatedAdoption)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTAdoption() {
  const mutation = useMutation({
    mutationFn: updateAdoption,
  })

  return mutation
}
