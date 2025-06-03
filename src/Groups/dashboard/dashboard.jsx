import React from "react";
import Login from "../../components/Login";
import OptionModal from "../../components/OptionsModal";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import useLogout from "../../components/custom_hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import profile from "../../assets/profileAvatar.jpg";
import investmatelogo from "../../assets/investmentlogo3.png";
import ProfileModalHome from './ProfileModalHome'


const Dashboard = () => {
  const [openLogin, setOpenLogIn] = React.useState(false);
  const [optionModal, setOptionModal] = React.useState(false);
  const [profileModal, setProfileModal] = React.useState(false);
  const UserData = useSelector((state) => state.Auth.UserData);
  const modalRef = React.useRef();
  const navigate = useNavigate();
  console.log(UserData, "UserData");

  const logout = useLogout();

  const handleGetStarted = () => {
    if (isEmpty(UserData)) {
      // setOpenLogIn(true);
      navigate('/login')
    } else {
      setOptionModal(true);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if(modalRef.current && modalRef.current.contains(event.target)){
        setProfileModal(false)
      }
    }

    if(profileModal){
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[profileModal])


  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://images.pexels.com/photos/15307542/pexels-photo-15307542/free-photo-of-close-up-of-a-blue-fabric-surface.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Finance Background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Header */}
    
      <header className="absolute top-0 left-0 w-full z-30 bg-white backdrop-blur-md border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between">
  <div >
    {/* <img src={investmatelogo} className=" h-13 w-30 pt-1 object-cover" /> */}
    <h1 className="text-gray-700 text-2xl font-bold tracking-tight">INVESTMATE</h1>
    <p className="text-[8.5px] text-gray-500 -mt-1 ml-[2px] font-medium">
      Start small. Think big. Grow together.
    </p>
  </div>

  <div className="flex items-center gap-4">
    {isEmpty(UserData) ? (
      <button
        onClick={() => navigate('/login')}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition"
      >
        <LogIn className="w-4 h-4" />
        Login
      </button>
    ) : (
      <div className="relative">
        <img
          src={UserData?.profileImage || profile}
          alt="User Profile"
          className="h-9 w-9 rounded-full border border-gray-300 hover:border-blue-500 cursor-pointer transition-all duration-150"
          onClick={() => setProfileModal((prev) => !prev)}
        />
      </div>
    )}
  </div>
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
      {profileModal && !isEmpty(UserData) && (
        <div>
          <ProfileModalHome
            profileModal={profileModal}
            setProfileModal={setProfileModal}
            modalRef = {modalRef}
            logout={logout}
          />
        </div>
      )}
    </section>
  );
};

export default Dashboard;
