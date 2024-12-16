import { api } from '@/src/lib/axios'
import { CampaignSchema } from '@/src/schemas/campaignSchema'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

async function createCampaign(newCampaign: CampaignSchema) {
  try {
    await api.post('/campanhas-adocao', newCampaign)
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export function usePOSTCampaign() {
  const mutation = useMutation({
    mutationFn: createCampaign,
  })

  return mutation
}
