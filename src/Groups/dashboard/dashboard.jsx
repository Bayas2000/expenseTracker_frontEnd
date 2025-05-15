import React from "react";
import Login from "../../components/Login";
import OptionModal from "../../components/OptionsModal";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import useLogout from "../../components/custom_hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";

const Dashboard = () => {
  const [openLogin, setOpenLogIn] = React.useState(false);
  const [optionModal, setOptionModal] = React.useState(false);
  const UserData = useSelector((state) => state.Auth.UserData);
  const modalRef = React.useRef();
  const navigate = useNavigate();
  console.log(UserData, "UserData");

  const logout = useLogout();

  const handleGetStarted = () => {
    if (isEmpty(UserData)) {
      setOpenLogIn(true);
    } else {
      setOptionModal(true);
    }
  };

  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        // src="https://images.pexels.com/photos/8358034/pexels-photo-8358034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        // src="https://images.unsplash.com/photo-1617880726918-4c862e74c826?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        // src="https://images.pexels.com/photos/5912574/pexels-photo-5912574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        src="https://images.pexels.com/photos/15307542/pexels-photo-15307542/free-photo-of-close-up-of-a-blue-fabric-surface.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Finance Background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 px-6 py-4 flex items-center justify-between bg-transparent">
        <h1 className="text-white text-2xl font-bold flex items-end relative">
          INVESTMATE
          <span className="text-[12px]  font-normal absolute whitespace-nowrap top-8  text-gray-400">
            Start small. Think big. Grow together.
          </span>
        </h1>
        {/* {isEmpty(UserData) ? (
          <button
            onClick={() => setOpenLogIn(true)}
            className="ml-auto md:ml-0 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="ml-auto md:ml-0 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition shadow-sm"
          >
            Log out
          </button>
        )} */}
        {isEmpty(UserData) ? (
          <button
            onClick={() => setOpenLogIn(true)}
            className="ml-auto md:ml-0 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="ml-auto md:ml-0 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        )}
      </header>

      <div
        ref={modalRef}
        className="relative z-10 flex items-center justify-center h-full px-4"
      >
        <div className="text-center text-white max-w-2xl w-full mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Grow Wealth Together, the Smart Way
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            Join trusted groups, invest consistently, and build long-term value
            — one step at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary Button */}
            <button
              onClick={() => handleGetStarted(true)}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md transition shadow-lg"
            >
              Get Started Now
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => navigate("/investmateIntro")}
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black font-semibold rounded-md transition shadow-lg"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>

      {openLogin && (
        <Login setOpenLogIn={setOpenLogIn} setOptionModal={setOptionModal} />
      )}

      {optionModal && !isEmpty(UserData) && (
        <div>
          <OptionModal
            optionModal={optionModal}
            setOptionModal={setOptionModal}
          />
        </div>
      )}
    </section>
  );
};

export default Dashboard;
