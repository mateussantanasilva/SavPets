import { format } from 'date-fns'

export function formatDate(date: Date | string) {
  if (!date) return null

  const formatedDate = format(date, 'dd/MM/yyyy')

  return formatedDate
}
