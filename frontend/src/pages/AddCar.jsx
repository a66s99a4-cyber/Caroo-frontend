import { useState } from "react"
import { createCar } from "../services/carService"
import { useNavigate } from "react-router-dom"

export default function AddCar() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    model: "",
    year: "",
    price: "",
    location: "",
    description: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createCar(formData)

      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] border p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-4">
          Add Car
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Add Car
        </button>
      </form>
    </div>
  )
}
