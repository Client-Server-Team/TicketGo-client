import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { api } from "../components/UrlApi";
import { formatRupiah } from "../helpers/formatRP";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const [recommendations, setRecommendations] = useState(null); // For AI recommendations
  const [otherTickets, setOtherTickets] = useState([]); // For other tickets with similar genre
  const [aiLoading, setAiLoading] = useState(true); // Track AI loading state
  const [isRecommendationsExpanded, setIsRecommendationsExpanded] =
    useState(false); // Track whether the recommendations are expanded
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

    const fetchTicketSummary = async () => {
      try {
        const response = await api.get(`/tickets/${id}/summary`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setRecommendations(response.data.recommendation);
        setOtherTickets(response.data.otherTickets);
      } catch (error) {
        console.error("Failed to fetch AI ticket recommendations:", error);
      } finally {
        setAiLoading(false); // Set AI loading to false once done
      }
    };

    fetchTicket();
    fetchTicketSummary();
  }, [id]);

  const handleExpandRecommendations = () => {
    setIsRecommendationsExpanded(!isRecommendationsExpanded); // Toggle expanded state
  };

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

  const handleProceedToPayment = async () => {
    if (!access_token) {
      Swal.fire({
        title: "Oops!",
        text: "Please log in first to proceed with the payment.",
        icon: "warning",
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        `/myticket/${id}`,
        {
          totalPrice: totalPrice,
          totalQuantity: quantityToBuy,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Your ticket has been successfully purchased!",
          icon: "success",
        }).then(() => {
          navigate("/mytickets"); // Redirect to My Tickets page
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "An error occurred while processing your transaction.",
        icon: "error",
      });
    } finally {
      setLoading(false);
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
        {/* Image */}
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

        {/* Details */}
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

          {/* Quantity & Total */}
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

          <button
            onClick={handleProceedToPayment}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </motion.div>
      </motion.div>

      {/* AI-generated recommendations */}
      {aiLoading ? (
        <div className="flex justify-center items-center mt-2">
          <p className="text-xl text-cyan-800 animate-pulse moveText">
            Loading AI Recommendations...
          </p>
        </div>
      ) : (
        recommendations && (
          <div className="mt-10 px-4 py-6 bg-white rounded-md shadow-md max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-cyan-800">
              AI Recommendations
            </h2>
            <p className="mt-4 text-md text-gray-700">
              {isRecommendationsExpanded
                ? recommendations
                : recommendations.slice(0, 200) + "..."}
            </p>
            <button
              onClick={handleExpandRecommendations}
              className="mt-2 text-cyan-600 hover:underline"
            >
              {isRecommendationsExpanded ? "Collapse" : "Expand"}
            </button>
          </div>
        )
      )}

      {/* Other tickets with similar genre */}
      {otherTickets.length > 0 && (
        <div className="mt-10 px-4 py-6 bg-white rounded-md shadow-md max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-cyan-800">
            Other Concerts You Might Like
          </h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {otherTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-cyan-50 p-4 rounded-md shadow-md"
              >
                <img
                  src={ticket.imageUrl}
                  alt={ticket.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold text-cyan-800">
                  {ticket.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {ticket.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
