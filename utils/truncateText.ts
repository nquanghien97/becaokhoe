export const truncateText = (text: string, end: number): string => {
  const text_array = text.split(' ')
  return `${text_array.slice(0, end).join(' ')} [...]`
}