import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateWithWeekDay(date: Date | string) {
  if (!date) return null

  let formattedDate = format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })

  formattedDate = formattedDate
    .substring(0, 1)
    .toUpperCase()
    .concat(formattedDate.substring(1, formattedDate.length))

  return formattedDate
}
