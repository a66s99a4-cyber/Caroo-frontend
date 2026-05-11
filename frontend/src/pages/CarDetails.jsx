import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import { getCar } from "../services/carService"

export default function CarDetails() {

  const { id } = useParams()

  const [car, setCar] = useState(null)

  useEffect(() => {
    fetchCar()
  }, [])

  const fetchCar = async () => {
    try {
      const data = await getCar(id)

      setCar(data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!car) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <img
        src={
          car.images?.[0] ||
          "https://via.placeholder.com/800x400"
        }
        alt={car.title}
        className="w-full h-[400px] object-cover rounded-2xl"
      />

      <div className="mt-6">

        <h1 className="text-4xl font-bold mb-4">
          {car.title}
        </h1>

        <p className="text-2xl font-semibold mb-4">
          {car.price} BHD
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="border p-4 rounded-xl">
            <p className="font-bold">Model</p>
            <p>{car.model}</p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="font-bold">Year</p>
            <p>{car.year}</p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="font-bold">Mileage</p>
            <p>{car.mileage}</p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="font-bold">Location</p>
            <p>{car.location}</p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="font-bold">Fuel Type</p>
            <p>{car.fuelType}</p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="font-bold">Transmission</p>
            <p>{car.transmission}</p>
          </div>

        </div>

        <div className="border p-4 rounded-xl">

          <h2 className="text-2xl font-bold mb-2">
            Description
          </h2>

          <p>
            {car.description}
          </p>

        </div>

      </div>

    </div>
  )
}
