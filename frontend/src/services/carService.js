import API from "../api/axios"

export const getCars = async () => {
  const res = await API.get("/cars")
  return res.data
}

export const getCar = async (id) => {
  const res = await API.get(`/cars/${id}`)
  return res.data
}

export const createCar = async (data) => {
  const res = await API.post("/cars", data)
  return res.data
}

export const updateCar = async (id, data) => {
  const res = await API.put(`/cars/${id}`, data)
  return res.data
}

export const deleteCar = async (id) => {
  const res = await API.delete(`/cars/${id}`)
  return res.data
}
