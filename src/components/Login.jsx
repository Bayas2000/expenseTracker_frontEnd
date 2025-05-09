import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../Store/AuthSlice";
import { persistor } from "../Store/store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isLoggedInState = useSelector((state) => state.Auth);
  const { UserLoggedIn } = isLoggedInState;

  console.log(UserLoggedIn, "UserLoggedIn");

  useEffect(() => {
    dispatch(isLoggedIn(false));
    persistor.purge();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic front-end validation
    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");

    try {
      const payload = { userName: username.trim(), password };
      const res = await api.post("/userAuth/login", payload);
      const token = res.data.data;
      localStorage.setItem("token", token);
      dispatch(isLoggedIn(true));
      navigate("/home");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        setError("Invalid username or password.");
      } else {
        setError(
          err.response?.data?.messgae || "Login failed. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Expense Tracker</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your finances</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-500 text-sm text-center" role="alert">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={false}
                disabled
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2 text-gray-400 text-sm">
                Remember me (coming soon)
              </span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
