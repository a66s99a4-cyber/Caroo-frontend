import { useContext, useState } from "react"

import { loginUser } from "../services/authService"

import { AuthContext } from "../context/AuthContext"

import { useNavigate } from "react-router-dom"

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { login } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await loginUser(formData)

      login(data.user, data.token)

      navigate("/")
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
          Login
        </h1>

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
          Login
        </button>
      </form>
    </div>
  )
}
