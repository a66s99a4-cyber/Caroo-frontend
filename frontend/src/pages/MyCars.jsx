import { useContext, useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

import {
  getCars,
  deleteCar
} from "../services/carService"

export default function MyCars() {

  const { user } = useContext(AuthContext)

  const [cars, setCars] = useState([])

  useEffect(() => {
    fetchMyCars()
  }, [])

  const fetchMyCars = async () => {
    try {
      const data = await getCars()

      const myCars = data.filter(
        (car) =>
          car.owner?._id === user?._id
      )

      setCars(myCars)

    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCar(id)

      setCars(
        cars.filter(
          (car) => car._id !== id
        )
      )

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          My Cars
        </h1>

        <Link
          to="/add-car"
          className="bg-black text-white px-5 py-2 rounded"
        >
          Add New Car
        </Link>

      </div>

      {cars.length === 0 ? (

        <p>You have no cars yet</p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {cars.map((car) => (

            <div
              key={car._id}
              className="border rounded-2xl p-4 shadow bg-white"
            >

              <img
                src={
                  car.images?.[0] ||
                  "https://via.placeholder.com/400x250"
                }
                alt={car.title}
                className="w-full h-52 object-cover rounded-xl"
              />

              <h2 className="text-2xl font-bold mt-4">
                {car.title}
              </h2>

              <p className="mt-2">
                {car.price} BHD
              </p>

              <p className="mt-1 text-gray-600">
                {car.location}
              </p>

              <div className="flex gap-2 mt-4">

                <Link
                  to={`/cars/${car._id}`}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Details
                </Link>

                <Link
                  to={`/edit-car/${car._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(car._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}
