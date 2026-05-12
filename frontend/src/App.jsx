import { useEffect, useState } from "react"
import "./App.css"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CarDetails from "./components/CarDetails"

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
  const [selectedCar, setSelectedCar] = useState(null)
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

  const openCarDetails = (car) => {
    setSelectedCar(car)
    setPage("carDetails")
  }

  const logout = () => {
    localStorage.removeItem("carooUser")
    localStorage.removeItem("carooToken")
    setUser(null)
    setSelectedCar(null)
    setPage("home")
  }

  return (
    <div className="app">
      <Navbar setPage={setPage} user={user} logout={logout} />

      {page === "home" && (
        <Home
          setPage={setPage}
          openBrandPage={openBrandPage}
          openCarDetails={openCarDetails}
          setSelectedCar={setSelectedCar}
          user={user}
        />
      )}

      {page === "brand" && (
        <BrandCars
          brand={selectedBrand}
          setPage={setPage}
          openCarDetails={openCarDetails}
          setSelectedCar={setSelectedCar}
        />
      )}

      {page === "addCar" && (
        <AddCar setPage={setPage} user={user} />
      )}

      {page === "allCars" && (
        <AllCars
          setPage={setPage}
          openCarDetails={openCarDetails}
          setSelectedCar={setSelectedCar}
        />
      )}

      {page === "favorites" && (
        <Favorites
          setPage={setPage}
          openCarDetails={openCarDetails}
          setSelectedCar={setSelectedCar}
        />
      )}

      {page === "myCars" && (
        <MyCars
          user={user}
          setPage={setPage}
          openCarDetails={openCarDetails}
          setSelectedCar={setSelectedCar}
        />
      )}

      {page === "carDetails" && selectedCar && (
        <CarDetails
          car={selectedCar}
          user={user}
          setPage={setPage}
        />
      )}

      {page === "login" && (
        <Login setPage={setPage} setUser={setUser} />
      )}

      {page === "register" && (
        <Register setPage={setPage} setUser={setUser} />
      )}

      <Footer />
    </div>
  )
}

export default App
