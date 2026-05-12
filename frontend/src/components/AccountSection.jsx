import { useEffect, useState } from "react"
import api, { API_BASE_URL } from "../api/api"

const AccountSection = ({ setPage, user }) => {
  const [myCars, setMyCars] = useState([])
  const [profileFile, setProfileFile] = useState(null)
  const [currentUser, setCurrentUser] = useState(user)

  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  const getImageUrl = (image) => {
    if (!image) return "/profile/default-profile.png"
    if (image.startsWith("http")) return image
    return `${API_BASE_URL}${image}`
  }

  const getCarImage = (car) => {
    if (car.images && car.images.length > 0) {
      return `${API_BASE_URL}${car.images[0]}`
    }

    if (car.image) {
      if (car.image.startsWith("http")) return car.image
      return `${API_BASE_URL}${car.image}`
    }

    return "/cars/default-car.png"
  }

  const getMyCars = async () => {
    try {
      const res = await api.get("/cars")

      const filteredCars = res.data.filter((car) => {
        return (
          car.seller?._id === currentUser?._id ||
          car.seller === currentUser?._id ||
          car.user === currentUser?._id ||
          car.owner === currentUser?._id
        )
      })

      setMyCars(filteredCars)
    } catch (error) {
      console.log(error)
    }
  }

  const updateProfileImage = async () => {
    if (!profileFile) {
      alert("Choose image first")
      return
    }

    try {
      const data = new FormData()
      data.append("profileImage", profileFile)

      const res = await api.put(`/auth/profile-image/${currentUser._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      localStorage.setItem("carooUser", JSON.stringify(res.data.user))
      setCurrentUser(res.data.user)
      setProfileFile(null)

      alert("Profile image updated")
    } catch (error) {
      console.log(error.response?.data)
      alert(error.response?.data?.message || "Update failed")
    }
  }

  useEffect(() => {
    if (currentUser) {
      getMyCars()
    }
  }, [currentUser])

  if (!currentUser) {
    return (
      <section className="account-section">
        <div className="signin-needed-box">
          <h2>Your account information</h2>
          <p>You need to sign in first to see your account and your posted cars.</p>
          <button onClick={() => setPage("login")}>Sign In</button>
        </div>
      </section>
    )
  }

  return (
    <section className="account-section">
      <h2>Your account information</h2>

      <div className="account-grid premium-account-grid">
        <div className="profile-card">
          <div className="profile-image-wrapper">
            <img
              src={getImageUrl(currentUser.profileImage)}
              alt="Profile"
              className="profile-img"
            />
          </div>

          <h3>{currentUser.nameEn || currentUser.username}</h3>
          <p>{currentUser.email}</p>

          <div className="profile-upload-box">
            <label className="custom-file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileFile(e.target.files[0])}
              />
              Choose Photo
            </label>

            {profileFile && (
              <p className="selected-file-name">{profileFile.name}</p>
            )}

            <button className="update-photo-btn" onClick={updateProfileImage}>
              Update Photo
            </button>
          </div>
        </div>

        <button className="new-post-btn" onClick={() => setPage("addCar")}>
          + New Post
        </button>

        <div className="your-posts-box">
          <h3>Your Cars</h3>

          {myCars.length > 0 ? (
            <div className="mini-cars-list">
              {myCars.slice(0, 3).map((car) => (
                <div className="mini-car" key={car._id}>
                  <img src={getCarImage(car)} alt={car.title} />

                  <div>
                    <h4>{car.title}</h4>
                    <p>{car.brand} - {car.category}</p>
                    <p>{car.status || "Available"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-posts">You have no cars yet.</p>
          )}

          <div className="post-actions">
            <button onClick={() => setPage("myCars")}>View All</button>
            <button onClick={() => setPage("addCar")}>Add Car</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountSection
