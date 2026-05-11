import { useEffect, useState } from "react"

import API from "../api/axios"

export default function Messages() {

  const [messages, setMessages] = useState([])

  const [formData, setFormData] = useState({
    receiver: "",
    car: "",
    text: ""
  })

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages")

      setMessages(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post(
        "/messages",
        formData
      )

      setMessages([...messages, res.data])

      setFormData({
        receiver: "",
        car: "",
        text: ""
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Messages
      </h1>

      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded-2xl bg-white shadow mb-8"
      >

        <h2 className="text-2xl font-bold mb-4">
          Send Message
        </h2>

        <input
          type="text"
          name="receiver"
          placeholder="Receiver User ID"
          value={formData.receiver}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="text"
          name="car"
          placeholder="Car ID"
          value={formData.car}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <textarea
          name="text"
          placeholder="Message"
          value={formData.text}
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded h-32"
        />

        <button
          className="bg-black text-white px-6 py-3 rounded"
        >
          Send Message
        </button>

      </form>

      <div className="space-y-4">

        {messages.map((message) => (

          <div
            key={message._id}
            className="border p-4 rounded-2xl bg-white shadow"
          >

            <p className="font-bold">
              From:
              {" "}
              {message.sender?.nameEn}
            </p>

            <p className="font-bold">
              To:
              {" "}
              {message.receiver?.nameEn}
            </p>

            <p className="mt-2">
              Car:
              {" "}
              {message.car?.title}
            </p>

            <p className="mt-4 text-lg">
              {message.text}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}
