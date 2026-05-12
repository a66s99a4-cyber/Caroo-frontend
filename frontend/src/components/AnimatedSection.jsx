const AnimatedSection = ({ setPage }) => {
  return (
    <section className="premium-explore-section">
      <div className="explore-content">
        <p className="eyebrow">Premium Marketplace</p>

        <h2>
          Drive the future <br /> with Caroo
        </h2>

        <p className="explore-text">
          Explore luxury, sport, electric, and premium cars from trusted sellers
          across the marketplace.
        </p>

        <button className="explore-btn" onClick={() => setPage("allCars")}>
          Explore All Cars
        </button>
      </div>

      <div className="explore-visual">
        <div className="visual-overlay"></div>

        <img
          className="garage-car-img"
          src="/cars/black-car.png"
          alt="Luxury car"
        />

        <div className="floating-glow"></div>
      </div>
    </section>
  )
}

export default AnimatedSection
