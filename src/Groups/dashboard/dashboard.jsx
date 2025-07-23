import React from "react";
import Login from "../../components/Login";
import OptionModal from "../../components/OptionsModal";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import useLogout from "../../components/custom_hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import profile from "../../assets/profileAvatar.jpg";
import ProfileModalHome from "./ProfileModalHome";
import { Player } from "@lottiefiles/react-lottie-player";

const Dashboard = () => {
  const [openLogin, setOpenLogIn] = React.useState(false);
  const [optionModal, setOptionModal] = React.useState(false);
  const [profileModal, setProfileModal] = React.useState(false);
  const UserData = useSelector((state) => state.Auth.UserData);
  const modalRef = React.useRef();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleGetStarted = () => {
    if (isEmpty(UserData)) {
      navigate("/login");
    } else {
      setOptionModal(true);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && modalRef.current.contains(event.target)) {
        setProfileModal(false);
      }
    };
    if (profileModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileModal]);

  return (
   <section className="relative w-full min-h-screen bg-gradient-to-br from-[#eef2f7] via-white to-[#e4e8f0] text-gray-800 overflow-hidden">
  {/* Header */}
  <header className="w-full z-30 px-6 py-4 sm:px-10 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md">
    <div className="flex flex-col">
      <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight">INVESTMATE</h1>
      <p className="text-xs text-gray-500">Expense tracking, simplified.</p>
    </div>

    <div className="flex items-center gap-3">
      {isEmpty(UserData) ? (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full shadow-md transition"
        >
          <LogIn className="w-4 h-4" />
          Login
        </button>
      ) : (
        <img
          src={UserData?.profileImage || profile}
          alt="User"
          className="h-10 w-10 rounded-full border border-gray-300 hover:ring-2 hover:ring-indigo-400 cursor-pointer transition-all"
          onClick={() => setProfileModal((prev) => !prev)}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = profile;
          }}
        />
      )}
    </div>
  </header>

  {/* Hero Section */}
  <div
    ref={modalRef}
    className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 py-16 lg:px-20 lg:py-28 max-w-7xl mx-auto"
  >
    {/* Text Content */}
    <div className="max-w-xl text-center lg:text-left">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-gray-800">
        <span className="text-indigo-600">Effortless</span> Group Expense Tracking
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Track expenses, split bills, and stay financially aligned with your friends and groups — all in one place.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-md shadow-lg transition"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/investmateIntro")}
          className="px-6 py-3 border border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium rounded-md transition"
        >
          How It Works
        </button>
      </div>
    </div>

    {/* Animation */}
    <div className="w-full max-w-md lg:max-w-lg bg-white rounded-xl p-4 shadow-md">
      <Player
        autoplay
        loop
        src="https://assets7.lottiefiles.com/packages/lf20_qp1q7mct.json"
        className="w-full h-full"
      />
    </div>
  </div>

  {/* Floating Animation */}
  <div className="fixed bottom-6 right-6 z-40 w-16 h-16 hidden md:block hover:scale-110 transition-transform duration-300 drop-shadow-xl">
    <Player
      autoplay
      loop
      src="https://assets1.lottiefiles.com/packages/lf20_3vbOcw.json"
      className="w-full h-full"
    />
  </div>

  {/* Modals */}
  {openLogin && (
    <Login setOpenLogIn={setOpenLogIn} setOptionModal={setOptionModal} />
  )}
  {optionModal  && (
    <OptionModal optionModal={optionModal} setOptionModal={setOptionModal} />
  )}
  {profileModal  && (
    <ProfileModalHome
      profileModal={profileModal}
      setProfileModal={setProfileModal}
      modalRef={modalRef}
      logout={logout}
    />
  )}
</section>

  );
};

export default Dashboard;
