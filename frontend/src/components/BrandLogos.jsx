import { useEffect, useState } from "react"

const brands = [
  { name: "Lexus", logo: "/brands/lexus.png" },
  { name: "Nissan", logo: "/brands/nissan.png" },
  { name: "Toyota", logo: "/brands/toyota.png" },
  { name: "BMW", logo: "/brands/bmw.png" },
  { name: "Mercedes", logo: "/brands/mercedes.png" },
  { name: "Porsche", logo: "/brands/porsche.png" },
  { name: "Ford", logo: "/brands/ford.png" },
  { name: "Kia", logo: "/brands/kia.png" },
  { name: "Volkswagen", logo: "/brands/volkswagen.png" },
  { name: "Chevrolet", logo: "/brands/chevrolet.png" },
  { name: "Honda", logo: "/brands/honda.png" },
  { name: "Hyundai", logo: "/brands/hyundai.png" },
  { name: "Audi", logo: "/brands/audi.png" },
  { name: "Dodge", logo: "/brands/dodge.png" },
  { name: "Mazda", logo: "/brands/mazda.png" },
  { name: "Jaguar", logo: "/brands/jaguar.png" },
  { name: "Land Rover", logo: "/brands/land-rover.png" }
]

const BrandLogos = ({ openBrandPage }) => {
  const [favoriteBrands, setFavoriteBrands] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("favoriteBrands")
    if (saved) {
      setFavoriteBrands(JSON.parse(saved))
    }
  }, [])

  const toggleFavoriteBrand = (e, brandName) => {
    e.stopPropagation()

    let updatedFavorites = []

    if (favoriteBrands.includes(brandName)) {
      updatedFavorites = favoriteBrands.filter((brand) => brand !== brandName)
    } else {
      updatedFavorites = [...favoriteBrands, brandName]
    }

    setFavoriteBrands(updatedFavorites)
    localStorage.setItem("favoriteBrands", JSON.stringify(updatedFavorites))
  }

  return (
    <section className="brands-section">
      <h2>Brands</h2>

      <div className="brands-grid">
        {brands.map((brand) => (
          <button
            key={brand.name}
            className="brand-logo"
            onClick={() => openBrandPage(brand.name)}
          >
            <button
              type="button"
              className={`brand-heart ${
                favoriteBrands.includes(brand.name) ? "active" : ""
              }`}
              onClick={(e) => toggleFavoriteBrand(e, brand.name)}
            >
              {favoriteBrands.includes(brand.name) ? "★" : "☆"}
            </button>

            <img src={brand.logo} alt={brand.name} />
            <span>{brand.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default BrandLogos
