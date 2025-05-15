import React from "react";
import api from "../api/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../Store/store";
import { getUserData } from "../Store/AuthSlice";
import useLogout from "./custom_hooks/useLogout";

const Profile = () => {
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = useLogout();

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
      })
      .catch((error) => console.log(error));
  }, []);

  const containerStyle =
    mode === "dark" ? "bg-[#f5f6fa] text-[#2D3A45]" : "bg-white";

  return (
    <div className="max-w-3xl  px-6 py-8">
      {/* Profile Card */}
      <div className={`rounded-2xl shadow-md ${containerStyle} mb-6`}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Profile Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Name</label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-50">
              {profile.userName}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-50">
              {profile.emailId}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Card */}
      <div className={`rounded-2xl shadow-md ${containerStyle}`}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Account Info</h2>
        </div>
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-sm text-gray-500">Member Since</span>
            <p className="text-lg font-medium mt-1">
              {profile.createdAt
                ? moment(profile.createdAt).format("MMM DD, YYYY")
                : "-"}
            </p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
