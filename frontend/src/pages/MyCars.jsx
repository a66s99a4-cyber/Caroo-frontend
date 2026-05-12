import { useEffect, useState } from "react"
import api, { API_BASE_URL } from "../api/api"

const MyCars = ({ user }) => {
  const [cars, setCars] = useState([])

  const getCarImage = (car) => {
    if (car.images && car.images.length > 0) {
      return `${API_BASE_URL}${car.images[0]}`
    }

    if (car.image) {
      if (car.image.startsWith("http")) return car.image
      return `${API_BASE_URL}${car.image}`
    }

    return "/cars/default-car.png"
  }

  const isMyCar = (car) => {
    return (
      car.seller?._id === user?._id ||
      car.seller === user?._id ||
      car.user === user?._id ||
      car.owner === user?._id
    )
  }

  const getMyCars = async () => {
    try {
      const res = await api.get("/cars")
      const filteredCars = res.data.filter((car) => isMyCar(car))
      setCars(filteredCars)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCar = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?")
    if (!confirmDelete) return

    try {
      await api.delete(`/cars/${id}`)
      getMyCars()
    } catch (error) {
      console.log(error.response?.data)
      alert("Delete failed")
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/cars/${id}`, { status })
      getMyCars()
    } catch (error) {
      console.log(error.response?.data)
      alert("Update failed")
    }
  }

  useEffect(() => {
    if (user) getMyCars()
  }, [user])

  if (!user) {
    return (
      <main className="page">
        <h1>My Posts</h1>
        <p>You need to sign in first.</p>
      </main>
    )
  }

  return (
    <main className="page">
      <h1>My Posts</h1>

      <div className="cars-grid">
        {cars.map((car) => (
          <div className="car-card" key={car._id}>
            <div className="car-img-box">
              <img src={getCarImage(car)} alt={car.title} />
            </div>

            <div className="car-card-content">
              <h3>{car.title}</h3>
              <p>{car.brand} - {car.category}</p>
              <p>{car.year}</p>
              <p>{car.price} BD</p>
              <p>{car.mileage || 0} KM</p>
              <p>Status: {car.status || "Available"}</p>

              <div className="post-actions">
                <button onClick={() => updateStatus(car._id, "Sold")}>
                  Mark Sold
                </button>

                <button onClick={() => updateStatus(car._id, "Available")}>
                  Available
                </button>

                <button onClick={() => deleteCar(car._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cars.length === 0 && <p>You have no cars yet.</p>}
    </main>
  )
}

export default MyCars
