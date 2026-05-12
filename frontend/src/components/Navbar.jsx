const Navbar = ({ setPage, user, logout }) => {
  return (
    <nav className="navbar">
      <button className="logo-circle" onClick={() => setPage("home")}>
        C
      </button>

      <ul className="nav-links">
        <li onClick={() => setPage("allCars")}>All Cars</li>
        <li onClick={() => setPage("favorites")}>My Favorite</li>
        <li onClick={() => setPage("myCars")}>My Posts</li>
        <li onClick={() => setPage("home")}>Brands</li>

        {!user ? (
          <>
            <li onClick={() => setPage("login")}>Sign In</li>
            <li onClick={() => setPage("register")}>Register</li>
          </>
        ) : (
          <li onClick={logout}>Logout</li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
