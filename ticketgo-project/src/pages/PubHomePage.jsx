import {useContext, useEffect} from "react";
import TicketCard from "../components/TicketCard";
import Navbar from "../components/Navbar";
import HomeContext from "../contexts/Home";

export default function PubHomePage() {
  const {tickets, loading, fetchTickets} = useContext(HomeContext);

  useEffect(() => {
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
      <Navbar />

      <div className="w-full pt-8 px-4 md:px-10">
        <h1 className="text-5xl font-bold text-center text-teal-700 mb-8">
          🎟️Tickets
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6 py-4 max-w-screen-xl mx-auto">

          {tickets &&
            tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
      </div>
    </div>
  );
}
