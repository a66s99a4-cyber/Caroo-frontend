import { Link } from "react-router-dom"

export default function CarCard({ car }) {

  return (
    <div className="car-card">

      <img
        src={
          car.images?.[0] ||
          "https://via.placeholder.com/400x250"
        }
        alt={car.title}
        className="car-image"
      />

      <div className="car-info">

        <h3>{car.title}</h3>

        <p>{car.location}</p>

        <div className="price">
          {car.price} BHD
        </div>

        <Link
          to={`/cars/${car._id}`}
          className="main-btn"
        >
          View Details
        </Link>

      </div>

    </div>
  )
}
