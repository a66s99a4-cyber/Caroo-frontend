import { useEffect, useState } from "react"
import api from "../api/api"
import CarCard from "../components/CarCard"

const AllCars = ({ setPage, setSelectedCar }) => {
  const [cars, setCars] = useState([])

  const getCars = async () => {
    try {
      const res = await api.get("/cars")
      setCars(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCars()
  }, [])

  return (
    <main className="page">
      <h1>All Cars</h1>

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

      {cars.length === 0 && <p className="empty-text">No cars found.</p>}
    </main>
  )
}

export default AllCars
