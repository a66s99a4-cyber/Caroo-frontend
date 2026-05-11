import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import {
  getCar,
  updateCar
} from "../services/carService"

export default function EditCar() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    location: "",
    description: ""
  })

  useEffect(() => {
    fetchCar()
  }, [])

  const fetchCar = async () => {
    try {
      const data = await getCar(id)

      setFormData({
        title: data.title || "",
        model: data.model || "",
        year: data.year || "",
        price: data.price || "",
        mileage: data.mileage || "",
        fuelType: data.fuelType || "",
        transmission: data.transmission || "",
        location: data.location || "",
        description: data.description || ""
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateCar(id, formData)

      navigate(`/cars/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="w-[600px] border p-6 rounded-2xl bg-white shadow"
      >

        <h1 className="text-3xl font-bold mb-6">
          Edit Car
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="number"
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          value={formData.fuelType}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded h-32"
        />

        <button
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          Update Car
        </button>

      </form>

    </div>
  )
}
