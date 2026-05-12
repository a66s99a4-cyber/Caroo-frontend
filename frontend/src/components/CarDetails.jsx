import { useEffect, useState } from "react"
import api, { API_BASE_URL } from "../api/api"

const CarDetails = ({ car, user, setPage }) => {
  const [messages, setMessages] = useState([])
  const [reviews, setReviews] = useState([])
  const [text, setText] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [reason, setReason] = useState("Wrong car information")
  const [loading, setLoading] = useState(false)

  const getCarImage = () => {
    if (car.images && car.images.length > 0) {
      return `${API_BASE_URL}${car.images[0]}`
    }

    if (car.image) {
      if (car.image.startsWith("http")) return car.image
      return `${API_BASE_URL}${car.image}`
    }

    return "/cars/default-car.png"
  }

  const getMessages = async () => {
    try {
      const res = await api.get(`/messages/car/${car._id}`)
      setMessages(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getReviews = async () => {
    try {
      const res = await api.get(`/reviews/${car._id}`)
      setReviews(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (car?._id) {
      getMessages()
      getReviews()
    }
  }, [car])

  const sendMessage = async (e) => {
    e.preventDefault()

    if (!user) {
      alert("Sign in first")
      return
    }

    if (!text.trim()) return

    try {
      setLoading(true)

      const res = await api.post(`/messages/car/${car._id}`, {
        text
      })

      setMessages([...messages, res.data])
      setText("")
    } catch (error) {
      console.log(error)
      alert("Message failed")
    } finally {
      setLoading(false)
    }
  }

  const addReview = async (e) => {
    e.preventDefault()

    if (!user) {
      alert("Sign in first")
      return
    }

    try {
      const res = await api.post("/reviews", {
        car: car._id,
        rating,
        comment
      })

      const filteredReviews = reviews.filter(
        (review) => review.user?._id !== user?._id
      )

      setReviews([res.data, ...filteredReviews])
      setComment("")
      setRating(5)
    } catch (error) {
      console.log(error)
      alert("Review failed")
    }
  }

  const sendReport = async () => {
    if (!user) {
      alert("Sign in first")
      return
    }

    try {
      await api.post("/reports", {
        car: car._id,
        reason
      })

      alert("Report sent successfully")
    } catch (error) {
      console.log(error)
      alert("Report failed")
    }
  }

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
          reviews.length
        ).toFixed(1)
      : "No rating yet"

  return (
    <section className="car-details-page">
      <button className="back-btn" onClick={() => setPage("home")}>
        Back
      </button>

      <div className="car-details-hero">
        <div className="car-details-image">
          <img src={getCarImage()} alt={car.title} />
        </div>

        <div className="car-details-info">
          <p className="details-tag">Premium Listing</p>

          <h1>{car.title}</h1>
          <h2>{car.price} BD</h2>

          <div className="details-specs">
            <span>{car.brand}</span>
            <span>{car.category}</span>
            <span>{car.year}</span>
            <span>{car.mileage || 0} KM</span>
            <span>{car.status || "Available"}</span>
          </div>

          <p className="details-description">
            {car.description || "No description added for this car."}
          </p>

          <div className="post-actions">
            {car.phone && (
              <>
                <a href={`tel:${car.phone}`}>
                  <button>Call Seller</button>
                </a>

                <a
                  href={`https://wa.me/${car.phone}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>WhatsApp</button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="car-interaction-grid">
        <div className="live-chat-box">
          <h2>Live Questions</h2>
          <p>Ask the seller anything about this car.</p>

          <div className="chat-messages">
            {messages.length === 0 && (
              <p className="empty-chat">No questions yet. Be the first one.</p>
            )}

            {messages.map((msg) => (
              <div
                className={`chat-bubble ${
                  msg.sender?._id === user?._id ? "mine" : ""
                }`}
                key={msg._id}
              >
                <strong>
                  {msg.sender?.nameEn || msg.sender?.nameAr || "User"}
                </strong>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="chat-form">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your question..."
            />
            <button disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <div className="review-box">
          <h2>Reviews</h2>
          <p className="avg-rating">★ {avgRating}</p>

          <form onSubmit={addReview} className="review-form">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
            />

            <button>Add Review</button>
          </form>

          <div className="reviews-list">
            {reviews.length === 0 && (
              <p className="empty-chat">No reviews yet.</p>
            )}

            {reviews.map((review) => (
              <div className="review-card" key={review._id}>
                <strong>
                  {review.user?.nameEn || review.user?.nameAr || "User"}
                </strong>
                <span>{"★".repeat(review.rating)}</span>
                <p>{review.comment || "No comment"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="report-box">
          <div>
            <h2>Report Listing</h2>
            <p>This helps Caroo keep the marketplace safe.</p>
          </div>

          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option>Wrong car information</option>
            <option>Fake listing</option>
            <option>Sold but still available</option>
            <option>Wrong price</option>
            <option>Inappropriate image</option>
          </select>

          <button onClick={sendReport}>Send Report</button>
        </div>
      </div>
    </section>
  )
}

export default CarDetails
