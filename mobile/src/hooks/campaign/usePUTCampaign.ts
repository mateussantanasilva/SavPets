import { api } from '@/src/lib/axios'
import { CampaignSchema } from '@/src/schemas/campaignSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UpdateProps {
  id: string
  updatedCampaign: CampaignSchema
}

async function updateCampaign({ id, updatedCampaign }: UpdateProps) {
  try {
    await api.put(`/campanhas-adocao/${id}`, updatedCampaign)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePUTCampaign() {
  const mutation = useMutation({
    mutationFn: updateCampaign,
  })

  return mutation
}
