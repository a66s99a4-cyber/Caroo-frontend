import API from "../api/axios"

// Get all favorites
export const getFavorites = async () => {

  const res = await API.get("/favorites")

  return res.data
}

// Add / Remove favorite
export const toggleFavorite = async (carId) => {

  const res = await API.post(
    `/favorites/${carId}`
  )

  return res.data
}
