import './App.css'
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import PubHomePage from './pages/PubHomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TicketDetailPage from './pages/TicketDetailPage';
import AuthLayout from './layouts/AuthLayouts';
import MyTicketsPage from './pages/MyTicketPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PubHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AuthLayout />}>
        <Route path="/tickets/:id" element={<TicketDetailPage />} />
        <Route path="/mytickets" element={<MyTicketsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
