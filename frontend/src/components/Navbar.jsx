import { Link } from "react-router-dom"

export default function Navbar() {

  return (
    <header className="header">

      <h1 className="logo">
        Car Market
      </h1>

      <nav className="nav">

        <Link to="/">
          Home
        </Link>

        <Link to="/add-car">
          Add Car
        </Link>

        <Link to="/favorites">
          Favorites
        </Link>

        <Link
          to="/login"
          className="main-btn"
        >
          Login
        </Link>

      </nav>

    </header>
  )
}
