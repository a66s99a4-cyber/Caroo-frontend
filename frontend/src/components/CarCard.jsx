import { API_BASE_URL } from "../api/api"

const CarCard = ({ car }) => {
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

  return (
    <div className="car-card">
      <div className="car-img-box">
        <img src={getCarImage()} alt={car.title} />
      </div>

      <div className="car-card-content">
        <h3>{car.title}</h3>
        <p>{car.brand} - {car.category}</p>
        <p>{car.year}</p>
        <p>{car.price} BD</p>
        <p>{car.mileage || 0} KM</p>
        <p>Status: {car.status || "Available"}</p>

        {car.phone && (
          <div className="post-actions">
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
          </div>
        )}
      </div>
    </div>
  )
}

export default CarCard
