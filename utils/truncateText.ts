export const truncateText = (text: string): string => {
  const text_array = text.split(' ')
  return `${text_array.slice(0, 15).join(' ')} [...]`
}