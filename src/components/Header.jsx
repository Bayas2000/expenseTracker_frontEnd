// import React, { useEffect } from "react";
// import expense from "../assets/expense4.png";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import DarkModeToggle from "./DarkModeButton";

// const Header = () => {
//   const isLoggedIn = useSelector((state) => state.Auth);
//   const { UserLoggedIn } = isLoggedIn;
//     const mode = useSelector((state) => state.theme.mode);

//   console.log(UserLoggedIn , 'UserLoggedIn');

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (UserLoggedIn === false) {
//       navigate("/login");
//     } else {
//       navigate("/home");
//     }
//   }, [isLoggedIn]);

//   return (
//     <div className={`${
//       mode == "dark" ? "bg-[#f5f6fa]" : " bg-[#1D2730] text-[#F1F1F1]"
//     } flex justify-between items-center border-1 border-gray-200 shadow-md p-2`}>
//       <div className=" flex justify-between ml-4">
//         <img className=" w-8 h-8 mt-1" src={expense} />
//         <h1 className=" text-center text-xl font-bold ml-2 my-2">
//           {" "}
//           Daily Expense Tracker
//         </h1>
//       </div>
//       <div className="mr-2 mt-2">
//         <DarkModeToggle />
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useEffect } from "react";
import expense from "../assets/expense4.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeButton";
import { FaUserCircle } from "react-icons/fa";
import { getUserData } from "../Store/AuthSlice";
import api from "../api/api";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.Auth);
  const { UserLoggedIn, UserData } = isLoggedIn;
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(UserData, "userData");

  useEffect(() => {
    if (!UserLoggedIn) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [UserLoggedIn]);

  React.useEffect(() => {
    api
      .get("/userAuth/get-user")
      .then((res) => {
        const response = res.data.data;
        dispatch(getUserData(response));
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  return (
    <header
      className={`${
        mode === "dark" ? "bg-[#f5f6fa] text-black" : "bg-[#1D2730] text-white"
      } flex justify-between items-center shadow-md px-4 py-3 sticky top-0 z-50`}
    >
      <div className="flex items-center gap-3">
        <img className="w-10 h-10" src={expense} alt="Logo" />
        <h1 className="text-2xl font-semibold">Daily Expense Tracker</h1>
      </div>

      <div className="flex items-center gap-4">
        {UserLoggedIn && UserData?.userName && (
          <div className="flex items-center gap-2">
            <FaUserCircle size={20} />
            <span className="text-md">{UserData.userName}</span>
          </div>
        )}

        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
