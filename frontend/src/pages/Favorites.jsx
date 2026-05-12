import { useEffect, useState } from "react"
import api from "../api/api"
import CarCard from "../components/CarCard"

const Favorites = ({ setPage, setSelectedCar }) => {
  const [cars, setCars] = useState([])
  const [favoriteBrands, setFavoriteBrands] = useState([])

  const getFavorites = async () => {
    try {
      const saved = localStorage.getItem("favoriteBrands")
      const brands = saved ? JSON.parse(saved) : []

      setFavoriteBrands(brands)

      const res = await api.get("/cars")

      const filteredCars = res.data.filter((car) => {
        return brands.includes(car.brand)
      })

      setCars(filteredCars)
    } catch (error) {
      console.log(error)
    }
  }

  const removeBrand = (brandName) => {
    const updatedFavorites = favoriteBrands.filter((brand) => brand !== brandName)

    localStorage.setItem("favoriteBrands", JSON.stringify(updatedFavorites))
    setFavoriteBrands(updatedFavorites)

    const updatedCars = cars.filter((car) => car.brand !== brandName)
    setCars(updatedCars)
  }

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <main className="page">
      <h1>My Favorite</h1>

      {favoriteBrands.length > 0 ? (
        <div className="favorite-brands-list">
          {favoriteBrands.map((brand) => (
            <button key={brand} onClick={() => removeBrand(brand)}>
              ★ {brand} ×
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-text">
          You have no favorite brands yet. Go to Brands and press the heart.
        </p>
      )}

      <div className="cars-grid">
        {cars.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            setPage={setPage}
            setSelectedCar={setSelectedCar}
          />
        ))}
      </div>

      {favoriteBrands.length > 0 && cars.length === 0 && (
        <p className="empty-text">
          No cars found for your favorite brands yet.
        </p>
      )}
    </main>
  )
}

export default Favorites
