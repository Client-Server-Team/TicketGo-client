import { useEffect, useState } from "react";
import { api } from "../components/UrlApi";
import NavbarLogin from "../components/NavbarLogin";
import TicketCard from "../components/TicketCard";

export default function PubHomePage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching Tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[url('/background.jpg')] bg-no-repeat bg-cover bg-center bg-fixed pt-14">
      <NavbarLogin />

      <div className="w-full pt-8 px-4 md:px-10">
        <h1 className="text-3xl font-bold text-center mb-6 bg-black/50 text-white py-2 rounded-lg shadow-lg max-w-xs mx-auto">
          Tickets
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4 max-w-screen-xl mx-auto">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
