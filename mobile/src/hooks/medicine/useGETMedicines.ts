import { api } from '@/src/lib/axios'
import { MedicineDTO } from '@/src/schemas/medicineSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchMedicines() {
  const { data } = await api.get('/medicamentos')

  return data
}

export function useGETMedicines() {
  const query = useQuery<MedicineDTO[]>({
    queryKey: ['medicineList'],

    queryFn: async () => await fetchMedicines(),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  const medicineCount = query.data?.length

  return { ...query, medicineCount }
}
