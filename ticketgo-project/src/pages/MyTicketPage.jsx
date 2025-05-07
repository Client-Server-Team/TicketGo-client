import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../components/UrlApi";
import { formatRupiah } from "../helpers/formatRP";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function MyTicketsPage() {
  const { id } = useParams(); // transactionId
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { data } = await api.get(`/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setTransaction(data);
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-cyan-50">
        Loading...
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Transaction not found.
      </div>
    );
  }

  const { Ticket: ticket, User: user } = transaction;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-white pt-16">
      <Navbar />

      <motion.div
        className="max-w-4xl mx-auto px-4 py-10 text-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold text-cyan-800 mb-6 text-center">
          My Ticket Detail
        </h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-700">
            {ticket.name}
          </h2>
          <img
            src={ticket.imageUrl}
            alt={ticket.name}
            className="w-full max-h-80 object-cover rounded-lg"
          />
          <p>
            <strong>Description:</strong> {ticket.description}
          </p>
          <p>
            <strong>Genre:</strong> {ticket.genre}
          </p>
          <p>
            <strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Location:</strong> {ticket.location}
          </p>
          <p>
            <strong>Ticket Price:</strong> {formatRupiah(ticket.price)}
          </p>

          <hr className="my-4" />

          <div>
            <h3 className="text-xl font-semibold text-cyan-700">Buyer Info</h3>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
