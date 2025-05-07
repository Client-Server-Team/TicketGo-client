import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../components/UrlApi";
import { formatRupiah } from "../helpers/formatRP";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setTicket(response.data);
      } catch (error) {
        console.error("Failed to fetch ticket details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-cyan-50">
        Loading...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Ticket not found.
      </div>
    );
  }

  const {
    name,
    genre,
    imageUrl,
    description,
    quantity,
    price,
    date,
    location,
  } = ticket;

  const totalPrice = price * quantityToBuy;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 5) {
      setQuantityToBuy(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-white pt-16">
      <Navbar />

      <motion.div
        className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Gambar */}
        <motion.div
          className="rounded-lg overflow-hidden shadow-lg"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Detail */}
        <motion.div
          className="space-y-4"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-cyan-700">{name}</h1>
          <p className="text-md text-cyan-900">
            <strong>Genre:</strong> {genre}
          </p>
          <p className="text-sm text-black">{description}</p>

          <div className="text-cyan-800 space-y-1">
            <p>
              <strong>Date:</strong> {new Date(date).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Available Tickets:</strong> {quantity}
            </p>
            <p>
              <strong>Price:</strong> {formatRupiah(price)}
            </p>
          </div>

          {/* Form Quantity & Total */}
          <div className="mt-6 p-4 bg-white rounded-md shadow border space-y-3">
            <label className="block text-sm font-medium text-cyan-800">
              Quantity (max 5):
            </label>
            <input
              type="number"
              value={quantityToBuy}
              onChange={handleQuantityChange}
              min={1}
              max={5}
              className="w-20 px-2 py-1 border rounded-md bg-cyan-100 text-cyan-900 placeholder:text-cyan-700 focus:outline-blue-400"
            />
            <p className="text-lg text-cyan-900">
              <strong>Total Price:</strong> {formatRupiah(totalPrice)}
            </p>
          </div>

          <button className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
            Proceed to Payment
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
