import {useEffect, useState} from "react";
import {api} from "../components/UrlApi";
import Swal from "sweetalert2";
import {motion} from "framer-motion";

export default function MyTicketsPage() {
  const [transactions, setTransactions] = useState([]); // Store an array of transactions
  const [loading, setLoading] = useState(true);
  const access_token = localStorage.getItem("access_token");

  // Fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const {data} = await api.get("/myticket", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTransactions(data); // Set the array of transactions
    } catch (error) {
      console.error("Failed to fetch transaction details:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Could not load transactions",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-teal-50">
        <span className="loading loading-spinner text-teal-500"></span>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-teal-50 text-teal-700 text-lg">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center text-teal-700 mb-8"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}>
          🎟️ My Tickets
        </motion.h2>

        {Array.isArray(transactions) &&
          transactions.map((transaction, index) => {
            const totalPrice =
              transaction.Ticket.price * transaction.totalQuantity;

            return (
              <motion.div
                key={transaction.id}
                className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-teal-200"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: index * 0.1}}>
                <motion.h3
                  className="text-xl font-semibold text-teal-700 mb-3"
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.6}}>
                  Transaction Info
                </motion.h3>
                <motion.p
                  className="text-gray-800"
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.6}}>
                  <strong>Username:</strong> {transaction.User.username}
                </motion.p>
                <motion.p
                  className="text-gray-800"
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.6}}>
                  <strong>Email:</strong> {transaction.User.email}
                </motion.p>
                <motion.p
                  className="text-gray-800"
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.6}}>
                  <strong>Transaction ID:</strong> {transaction.id}
                </motion.p>

                <motion.div
                  className="flex justify-between items-start bg-white shadow-lg rounded-xl p-6 border border-teal-200 mt-4"
                  initial={{opacity: 0, x: 20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.6}}>
                  <div className="flex-1">
                    <motion.h3
                      className="text-xl font-semibold text-teal-700 mb-3"
                      initial={{opacity: 0, y: -20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.6}}>
                      Ticket Info
                    </motion.h3>
                    <motion.p
                      className="text-gray-800"
                      initial={{opacity: 0, y: -20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.6}}>
                      <strong>Event:</strong> {transaction.Ticket.name}
                    </motion.p>
                    <motion.p
                      className="text-gray-800"
                      initial={{opacity: 0, y: -20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.6}}>
                      <strong>Price per Ticket:</strong> Rp{" "}
                      {transaction.Ticket.price.toLocaleString()}
                    </motion.p>
                    <motion.p
                      className="text-gray-800"
                      initial={{opacity: 0, y: -20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.6}}>
                      <strong>Quantity:</strong> {transaction.totalQuantity}
                    </motion.p>
                    <motion.p
                      className="text-gray-800"
                      initial={{opacity: 0, y: -20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.6}}>
                      <strong>Total Price:</strong> Rp{" "}
                      {totalPrice.toLocaleString()}
                    </motion.p>
                    <motion.p
                      className="text-gray-800"
                      initial={{opacity: 0, y: -20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.6}}>
                      <strong>Event Date:</strong>{" "}
                      {new Date(transaction.Ticket.date).toLocaleDateString()}
                    </motion.p>
                    <motion.p
                      className="text-gray-800"
                      initial={{opacity: 0, y: -20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.6}}>
                      <strong>Event Location:</strong>{" "}
                      {transaction.Ticket.location}
                    </motion.p>
                  </div>

                  <motion.img
                    className="w-40 h-auto rounded-lg ml-4"
                    src={transaction.Ticket.imageUrl}
                    alt={transaction.Ticket.name}
                    initial={{opacity: 0, x: 20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.6}}
                  />
                </motion.div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
