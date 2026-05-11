import { useEffect, useState } from "react"

import { getCars } from "../services/carService"

import CarCard from "../components/CarCard"

export default function Home() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const data = await getCars()
      setCars(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <section
        className="hero"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070')",
        }}
      >
        <div className="hero-overlay">
          <h1>Find Your Dream Car</h1>

          <p>Buy and sell premium cars easily with Car Market.</p>

          <div className="hero-buttons">
            <button className="main-btn">Explore Cars</button>

            <button className="secondary-btn">Sell Your Car</button>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Featured Cars</h2>

        <p>Browse our latest premium cars.</p>

        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </div>
  )
}
