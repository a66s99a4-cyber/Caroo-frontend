import { useState } from "react"
import api from "../api/api"

const brands = [
  "Lexus",
  "Nissan",
  "Toyota",
  "BMW",
  "Mercedes",
  "Porsche",
  "Ford",
  "Kia",
  "Volkswagen",
  "Chevrolet",
  "Honda",
  "Hyundai",
  "Audi",
  "Dodge",
  "Mazda",
  "Jaguar",
  "Land Rover"
]

const categories = ["SUV", "Sedan", "Sport", "Pickup", "Luxury", "Electric"]

const AddCar = ({ setPage, user }) => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    year: "",
    price: "",
    mileage: "",
    description: "",
    phone: "",
    image: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      alert("You must sign in first")
      setPage("login")
      return
    }

    try {
      const newCar = {
        title: formData.title,
        brand: formData.brand,
        category: formData.category,
        year: formData.year,
        price: formData.price,
        mileage: formData.mileage,
        description: formData.description,
        phone: formData.phone,
        image: formData.image,
        seller: user._id
      }

      await api.post("/cars", newCar)

      alert("Car added successfully")
      setPage("myCars")
    } catch (error) {
      console.log("ERROR RESPONSE:", error.response?.data)
      alert(error.response?.data?.message || "Error adding car")
    }
  }

  return (
    <main className="form-page">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back
      </button>

      <h1>Add New Car</h1>

      <form className="car-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Car title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select name="brand" value={formData.brand} onChange={handleChange} required>
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price BD"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Paste car image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button className="black-btn" type="submit">
          Add Car
        </button>
      </form>
    </main>
  )
}

export default AddCar
