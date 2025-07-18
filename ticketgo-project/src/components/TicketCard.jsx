import { useRef } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { formatRupiah } from "../helpers/formatRP";

export default function TicketCard({ ticket }) {
  const navigate = useNavigate();
  const { id, name, imageUrl, quantity, price, date, location, audioFile } = ticket;

  const audioRef = useRef(null);

  let playTimeout;

  const handleMouseEnter = () => {
    if (audioRef.current) {
      clearTimeout(playTimeout); // prevent stacking
      playTimeout = setTimeout(() => {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }, 100); // delay 100ms
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(playTimeout); // cancel pending play
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleBuyNow = () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      Swal.fire({
        title: "Oops!",
        text: "Please login first to buy a ticket.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Back to Home",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#aaa",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/");
        }
      });
    } else {
      navigate(`/tickets/${ticket.id}`);
    }
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
        delay: 0.1,
      }}
    >
      <div className="card bg-base-100 h-140 w-70 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
        <figure className="w-full h-80 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body relative">
          <h2 className="card-title">{name}</h2>

          <div className="text-xs text-white-300 space-y-1">
            <p>
              <strong>Date:</strong> {new Date(date).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Available:</strong> {quantity} tickets
            </p>
            <p>
              <strong>Price:</strong> {formatRupiah(price)}
            </p>
          </div>

          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleBuyNow}
              className="btn bg-cyan-500 hover:bg-cyan-600 text-white border-none"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Audio tag with dynamic source */}
        {audioFile && <audio ref={audioRef} src={`/sounds/${audioFile}`} />}
      </div>
    </motion.div>
  );
}
