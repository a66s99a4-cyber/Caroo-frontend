import { useEffect, useState } from "react"
import api from "../api/api"
import CarCard from "../components/CarCard"

const categories = ["SUV", "Sedan", "Sport", "Pickup", "Luxury", "Electric"]

const BrandCars = ({ brand, setPage, setSelectedCar }) => {
  const [cars, setCars] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const getCars = async () => {
    try {
      const res = await api.get("/cars")
      const brandCars = res.data.filter((car) => car.brand === brand)
      setCars(brandCars)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCars()
  }, [brand])

  const filteredCars =
    selectedCategory === "All"
      ? cars
      : cars.filter((car) => car.category === selectedCategory)

  return (
    <main className="brand-page">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back
      </button>

      <h1>{brand} Cars</h1>

      <div className="category-filter">
        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="cars-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              setPage={setPage}
              setSelectedCar={setSelectedCar}
            />
          ))
        ) : (
          <p className="empty-text">No cars found for this brand/category.</p>
        )}
      </div>
    </main>
  )
}

export default BrandCars
