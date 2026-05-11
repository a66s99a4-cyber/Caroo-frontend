import { useEffect, useState } from "react"

import { getCars, deleteCar } from "../services/carService"

export default function AdminDashboard() {
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

  const handleDelete = async (id) => {
    try {
      await deleteCar(id)

      setCars(cars.filter((car) => car._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Year</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="p-3 border">{car.title}</td>

                <td className="p-3 border">{car.price}</td>

                <td className="p-3 border">{car.year}</td>

                <td className="p-3 border">{car.location}</td>

                <td className="p-3 border flex gap-2">
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
