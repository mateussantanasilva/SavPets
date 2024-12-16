export function formatCreatedAt(date: string | null) {
  if (!date) return null

  const splitedDate = date.split('/')

  const formattedCreatedAt = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`

  return formattedCreatedAt
}