import { Link, useNavigate } from "react-router";
import { api } from "../components/UrlApi";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { formatRupiah } from "../helpers/formatRP";

export default function TicketCard({ ticket }) {
  const navigate = useNavigate();
  const {
    name,
    imageUrl,
    quantity,
    price,
    date,
    location,
  } = ticket;

  return (
    <motion.div
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
      <div className="card bg-base-100 w-70 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
        <figure>
          <img src={imageUrl} alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>

          <div className="text-xs text-white-300">
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
          <div className="card-actions justify-end">
            <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white border-none">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
