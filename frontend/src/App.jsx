import { useEffect, useState } from "react"
import "./App.css"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import BrandCars from "./pages/BrandCars"
import AddCar from "./pages/AddCar"
import AllCars from "./pages/AllCars"
import Favorites from "./pages/Favorites"
import MyCars from "./pages/MyCars"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  const [page, setPage] = useState("home")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("carooUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const openBrandPage = (brand) => {
    setSelectedBrand(brand)
    setPage("brand")
  }

  const logout = () => {
    localStorage.removeItem("carooUser")
    localStorage.removeItem("carooToken")
    setUser(null)
    setPage("home")
  }

  return (
    <div className="app">
      <Navbar setPage={setPage} user={user} logout={logout} />

      {page === "home" && (
        <Home
          setPage={setPage}
          openBrandPage={openBrandPage}
          user={user}
        />
      )}

      {page === "brand" && (
        <BrandCars brand={selectedBrand} setPage={setPage} />
      )}

      {page === "addCar" && <AddCar setPage={setPage} user={user} />}
      {page === "allCars" && <AllCars />}
      {page === "favorites" && <Favorites />}
      {page === "myCars" && <MyCars user={user} />}
      {page === "login" && <Login setPage={setPage} setUser={setUser} />}
      {page === "register" && <Register setPage={setPage} setUser={setUser} />}

      <Footer />
    </div>
  )
}

export default App
