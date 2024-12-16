import { api } from '@/src/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function deleteCampaign(id: string) {
  try {
    await api.delete(`/campanhas-adocao/${id}`)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function useDELETECampaign() {
  const mutation = useMutation({
    mutationFn: deleteCampaign,
  })

  return mutation
}
