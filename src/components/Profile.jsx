import React from "react";
import api from "../api/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../Store/store";
import { getUserData } from "../Store/AuthSlice";

const Profile = () => {
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const [profile, setProfile] = React.useState({
    userName: "",
    emailId: "",
    createdAt: "",
  });

  React.useEffect(() => {
    api
      .get("/userAuth/get-user")
      .then((res) => {
        const response = res.data.data;
        setProfile(response);
        dispatch(getUserData(response));
        console.log(response, "response profile");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  const handleLogout = async () => {
    api
      .post("/userAuth/logout")
      .then(() => {
        navigate("/login");
        persistor.purge();
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  return (
    <div className="lg:w-[80%] max-w-[750px]">
      <div
        className={` ${
          mode == "dark" ? "bg-[#f5f6fa] text-[#2D3A45]" : "bg-white"
        } min-h-[25vh] mt-5 rounded-lg  shadow-sm`}
      >
        <h2 className=" text-xl font-semibold p-3 pl-6">Profile Details</h2>
        <div className=" h-[1px]  bg-gray-200" />
        <div className=" flex lg:items-center md:items-center sm:items-center lg:flex-row md:flex-row  sm:flex-row flex-row items-center  pb-4">
          <div className=" flex flex-col p-3">
            <span className=" ml-3 text-sm  ">Name</span>
            <input
              className=" border-1 border-gray-300 p-2 rounded-sm mt-1 text-sm  ml-3 lg:min-w-[300px] md:min-w-[300px] sm:min-w-[250px] w-[90%]"
              placeholder="Enter the Name"
              value={profile.userName}
            />
          </div>
          <div className=" flex flex-col px-3 py-1">
            <span className=" ml-3 text-sm  ">Email</span>
            <input
              className=" border-1 border-gray-300 p-2 rounded-sm mt-1 text-sm ml-3 lg:min-w-[300px] md:min-w-[300px] sm:min-w-[250px] w-[90%]"
              placeholder="Enter the Email"
              value={profile.emailId}
            />
          </div>
        </div>
      </div>
      <div
        className={`${
          mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        } pb-5 mt-5 rounded-lg  shadow-sm`}
      >
        <h2 className=" text-xl font-semibold p-3 pl-6">Account Statistics</h2>
        <div className=" h-[1px] w-[100%] bg-gray-200" />
        <div className=" h-[30%]  bg-gray-200 m-5 ml-5 flex items-center flex-col justify-center rounded-lg p-3">
          <span>Member Since</span>
          <p className="text-sm font-semibold">
            {profile.createdAt
              ? moment(profile.createdAt).format("MMM DD YYYY")
              : ""}
          </p>
        </div>
        <div className="flex justify-end mx-5">
          <button
            onClick={handleLogout}
            className={`p-2 px-4 rounded-lg ml-5 transition-colors duration-200 ${
              mode == "dark"
                ? "bg-red-700 hover:bg-red-600 text-white"
                : "bg-red-300 hover:bg-red-600 text-black"
            }`}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
