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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PubHomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
