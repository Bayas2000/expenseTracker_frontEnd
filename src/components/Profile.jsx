import React from "react";
import api from "../api/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Store/AuthSlice";
import useLogout from "./custom_hooks/useLogout";

import { ArrowLeft, Mail, Calendar, UserCircle } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className={`rounded-2xl shadow-md ${containerStyle} mb-6`}>
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-b border-gray-200">
          <UserCircle className="w-20 h-20 text-gray-400" />
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">{profile.userName}</h2>
            <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 mt-1">
              <Mail className="w-4 h-4 mr-2" />
              <span>{profile.emailId}</span>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-base font-medium">
                {profile.createdAt
                  ? moment(profile.createdAt).format("MMM DD, YYYY")
                  : "-"}
              </p>
            </div>
          </div>

          <div className="flex justify-start md:justify-end items-center">
            <button
              onClick={logout}
              className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-sm transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

