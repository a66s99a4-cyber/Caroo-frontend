const Hero = ({ setPage }) => {
  return (
    <section className="hero">
      <div className="hero-box">
        <div className="hero-noise"></div>
        <div className="hero-light"></div>

        <div className="hero-content">
          <span className="hero-badge">New Premium Experience</span>

          <p>Premium Car Marketplace</p>

          <h1>
            Drive the future with <span>Caroo</span>
          </h1>

          <div className="hero-actions">
            <button onClick={() => setPage("allCars")}>
              Explore Collection
            </button>

            <button
              className="hero-outline-btn"
              onClick={() => setPage("addCar")}
            >
              Sell Your Car
            </button>
          </div>
        </div>

        <div className="hero-car-frame">
          <div className="hero-scan"></div>

          <img
            className="hero-car-img"
            src="/cars/hero-car.png"
            alt="Premium car"
          />
        </div>

        <div className="hero-bottom-glow"></div>
      </div>
    </section>
  )
}

export default Hero
