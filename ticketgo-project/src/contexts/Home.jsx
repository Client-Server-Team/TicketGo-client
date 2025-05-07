import {createContext, useState} from "react";
import {api} from "../components/UrlApi";

const HomeContext = createContext({
  tickets: [],
  loading: false,
  fetchTickets: () => {},
});
export default HomeContext;

export function Home(props) {
  console.log(props, "<<<< get data dari context");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTickets() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await api.get("/tickets");
    setTickets(response.data);
    setLoading(false);
  }

  return (
    <HomeContext.Provider
      value={{
        tickets: tickets,
        loading: loading,
        fetchTickets: fetchTickets,
      }}>
      {props.children}
    </HomeContext.Provider>
  );
}
