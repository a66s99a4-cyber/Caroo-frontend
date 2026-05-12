import { useState } from "react"
import api from "../api/api"

const Register = ({ setPage, setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    nameEn: "",
    nameAr: "",
    email: "",
    password: ""
  })

  const [profileImage, setProfileImage] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = new FormData()

      data.append("username", formData.username)
      data.append("nameEn", formData.nameEn)
      data.append("nameAr", formData.nameAr)
      data.append("email", formData.email)
      data.append("password", formData.password)

      if (profileImage) {
        data.append("profileImage", profileImage)
      }

      const res = await api.post("/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      localStorage.setItem("carooToken", res.data.token)
      localStorage.setItem("carooUser", JSON.stringify(res.data.user))

      setUser(res.data.user)
      setPage("home")
    } catch (error) {
      console.log(error.response?.data)
      alert(error.response?.data?.message || "Register failed")
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Join Caroo and start selling cars.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="text" name="nameEn" placeholder="English Name" value={formData.nameEn} onChange={handleChange} required />
          <input type="text" name="nameAr" placeholder="Arabic Name" value={formData.nameAr} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />

          <button type="submit">Register</button>
        </form>

        <span onClick={() => setPage("login")}>
          Already have an account? Sign In
        </span>
      </div>
    </main>
  )
}

export default Register
