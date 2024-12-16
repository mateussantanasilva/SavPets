import { api } from '@/src/lib/axios'
import { CampaignDTO } from '@/src/schemas/campaignSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchCampaigns() {
  const { data } = await api.get('/campanhas-adocao')

  return data
}

export function useGETCampaigns() {
  const query = useQuery<CampaignDTO[]>({
    queryKey: ['campaignList'],

    queryFn: async () => await fetchCampaigns(),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  const campaignCount = query.data?.length

  return { ...query, campaignCount }
}
