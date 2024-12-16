import { api } from '@/src/lib/axios'
import { CampaignDTO } from '@/src/schemas/campaignSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchCampaign(id: string) {
  const { data } = await api.get(`/campanhas-adocao/${id}`)

  return data
}

export function useGETCampaignById(id: string) {
  const query = useQuery<CampaignDTO>({
    queryKey: ['campaign', id],

    queryFn: async () => await fetchCampaign(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
