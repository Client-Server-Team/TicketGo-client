import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { api } from "../components/UrlApi";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await api.post("/register", {
        username,
        email,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Successfully Register!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.response?.data?.message,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-black-300 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center text-4xl font-bold text-black"
          >
            <img src="/logoweb.png" alt="logo.png" className="w-12 h-12 mr-2" />
            TicketGo!
          </Link>
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/music2.gif"
          className="mx-auto h-70 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-black"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="input-username"
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-black"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="input-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-black"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="input-password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-400 hover:text-blue-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
