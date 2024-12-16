import { api } from '@/src/lib/axios'
import { MedicineDTO } from '@/src/schemas/medicineSchema'
import { useQuery } from '@tanstack/react-query'

async function fetchMedicine(id: string) {
  const { data } = await api.get(`/medicamentos/${id}`)

  return data
}

export function useGETMedicineById(id: string) {
  const query = useQuery<MedicineDTO>({
    queryKey: ['medicine', id],

    queryFn: async () => await fetchMedicine(id),
    refetchInterval: 1000 * 60 * 5, // 5 minutes in milliseconds
  })

  return query
}
