import React, { useState, useEffect } from "react";
import api from "../api/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Store/AuthSlice";
import { ArrowLeft, Mail, Calendar, UserCircle } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useLogout from "@/components/custom_hooks/useLogout";

const Profile = () => {
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useLogout();

  const [profile, setProfile] = useState({
    userName: "",
    emailId: "",
    profileImage: "",
    createdAt: "",
  });

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    api
      .get("/userAuth/get-user")
      .then((res) => {
        const user = res.data.data;
        setProfile(user);
        setFormData((prev) => ({
          ...prev,
          userName: user.userName,
        }));
        dispatch(getUserData(user));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      data.append("userName", formData.userName);
      if (formData.password) data.append("password", formData.password);
      if (formData.profileImage) data.append("profileImage", formData.profileImage);

      const res = await api.put("/userAuth/update-profile", data);
      const updated = res.data.data;
      setProfile(updated);
      dispatch(getUserData(updated));
      setLoading(false);
      alert("Profile updated successfully");
    } catch (err) {
      setLoading(false);
      alert("Something went wrong!");
      console.error(err);
    }
  };

  const containerStyle =
    mode === "dark" ? "bg-[#f5f6fa] text-[#2D3A45]" : "bg-white";

  return (
    <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4  mx-4 my-2">
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
    <div className="max-w-3xl mx-auto px-4 py-8">      

      {/* Profile Form */}
      <div className={`rounded-2xl shadow-md ${containerStyle} mb-6`}>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Image + Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {(previewImage || profile.profileImage) ? (
              <img
                src={previewImage || profile.profileImage}
                alt="Profile"
                className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover border border-blue-400 bg-blue-300 cursor-pointer"
                onClick={() => setShowPreview(true)}
              />
            ) : (
              <UserCircle className="w-20 h-20 text-gray-400" />
            )}
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium mb-1">Change Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium mb-1">Email (read-only)</label>
            <input
              type="email"
              value={profile.emailId}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Leave empty to keep current password"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                Member Since:{" "}
                <span className="font-medium">
                  {profile.createdAt
                    ? moment(profile.createdAt).format("MMM DD, YYYY")
                    : "-"}
                </span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
              <button
                onClick={logout}
                type="button"
                className="w-full sm:w-auto px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white shadow"
              >
                Log Out
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Lightbox Preview */}
      {showPreview && (
        <Lightbox
          open={showPreview}
          close={() => setShowPreview(false)}
          slides={[
            {
              src: previewImage || profile?.profileImage,
            },
          ]}
        />
      )}
    </div>
    </>
  );
};

export default Profile;
