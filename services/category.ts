export const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`)
  return res.json()
}