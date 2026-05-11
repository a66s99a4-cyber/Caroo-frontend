import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import API from "../api/axios"

export default function Favorites() {

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const res = await API.get("/favorites")

      setFavorites(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (carId) => {
    try {
      await API.post(`/favorites/${carId}`)

      setFavorites(
        favorites.filter(
          (fav) => fav.car._id !== carId
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {favorites.map((favorite) => (

            <div
              key={favorite._id}
              className="border rounded-2xl p-4 shadow bg-white"
            >

              <img
                src={
                  favorite.car.images?.[0] ||
                  "https://via.placeholder.com/400x250"
                }
                alt={favorite.car.title}
                className="w-full h-52 object-cover rounded-xl"
              />

              <h2 className="text-2xl font-bold mt-4">
                {favorite.car.title}
              </h2>

              <p className="text-lg mt-2">
                {favorite.car.price} BHD
              </p>

              <div className="flex gap-2 mt-4">

                <Link
                  to={`/cars/${favorite.car._id}`}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Details
                </Link>

                <button
                  onClick={() =>
                    removeFavorite(favorite.car._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  )
}
