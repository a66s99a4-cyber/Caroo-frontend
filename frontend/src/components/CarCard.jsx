import { API_BASE_URL } from "../api/api"

const CarCard = ({ car, setSelectedCar, setPage }) => {
  const getCarImage = () => {
    if (car.images && car.images.length > 0) {
      return `${API_BASE_URL}${car.images[0]}`
    }

    if (car.image) {
      if (car.image.startsWith("http")) return car.image
      return `${API_BASE_URL}${car.image}`
    }

    return "/cars/default-car.png"
  }

  const openDetails = () => {
    setSelectedCar(car)
    setPage("carDetails")
  }

  return (
    <div className="car-card">
      <div className="car-img-box" onClick={openDetails}>
        <img src={getCarImage()} alt={car.title} />
      </div>

      <div className="car-card-content">
        <h3>{car.title}</h3>
        <p>{car.brand} - {car.category}</p>
        <p>{car.year}</p>
        <p>{car.price} BD</p>
        <p>{car.mileage || 0} KM</p>
        <p>Status: {car.status || "Available"}</p>

        <div className="post-actions">
          <button onClick={openDetails}>View Details</button>

          {car.phone && (
            <>
              <a href={`tel:${car.phone}`}>
                <button>Call Seller</button>
              </a>

              <a
                href={`https://wa.me/${car.phone}`}
                target="_blank"
                rel="noreferrer"
              >
                <button>WhatsApp</button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarCard
