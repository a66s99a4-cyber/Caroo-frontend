import { useState } from "react"

import { registerUser } from "../services/authService"

import { useNavigate } from "react-router-dom"

export default function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    email: "",
    password: ""
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
      await registerUser(formData)

      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] border p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-4">
          Register
        </h1>

        <input
          type="text"
          name="nameEn"
          placeholder="English Name"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="nameAr"
          placeholder="Arabic Name"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  )
}
