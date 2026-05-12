import { useState } from "react"
import api from "../api/api"

const Login = ({ setPage, setUser }) => {
  const [formData, setFormData] = useState({
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
      const res = await api.post("/auth/login", formData)

      localStorage.setItem("carooToken", res.data.token)
      localStorage.setItem("carooUser", JSON.stringify(res.data.user))

      setUser(res.data.user)
      setPage("home")
    } catch (error) {
      console.log(error)
      alert("Login failed")
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Sign in to manage your cars.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Sign In</button>
        </form>

        <span onClick={() => setPage("register")}>
          Don't have an account? Register
        </span>
      </div>
    </main>
  )
}

export default Login
