import { Navigate, Outlet } from 'react-router'
import Navbar from "../components/NavbarLogout"

export default function AuthLayout() {
    const access_token = localStorage.getItem("access_token")

    if(!access_token) {
        return <Navigate to={"/login"} />
    }

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}