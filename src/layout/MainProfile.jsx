import React, { useState, useEffect } from "react";
import api from "../api/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Store/AuthSlice";
import { ArrowLeft, Calendar, UserCircle } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useLogout from "@/components/custom_hooks/useLogout";
import { toast } from "react-toastify";

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
    profileImage: null, // This will hold the image URL
  });

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
  }, [dispatch]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formDataImage = new FormData();
      formDataImage.append("file", file);

      try {
        const res = await api.post("/fileUpload/file-upload", formDataImage);
        const imageUrl = res.data.data;

        setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
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

      const payload = {
        userName: formData.userName,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      if (formData.profileImage) {
        payload.profileImage = formData.profileImage;
      }

      const res = await api.put("/userAuth/update-profile", payload);
      const updated = res.data.data;
      setProfile(updated);
      // dispatch(getUserData(updated));
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
      toast.success("Profile updated successfully");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  const containerStyle =
    mode === "dark" ? "bg-[#f5f6fa] text-[#2D3A45]" : "bg-white";

  const imageToShow = formData.profileImage || profile.profileImage;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mx-4 my-2">
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
        <div className={`rounded-2xl shadow-md ${containerStyle} mb-6`}>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {imageToShow ? (
                <img
                  src={imageToShow}
                  alt="Profile"
                  className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover border border-blue-400 bg-blue-300 cursor-pointer"
                  onClick={() => setShowPreview(true)}
                />
              ) : (
                <UserCircle className="w-20 h-20 text-gray-400" />
              )}

              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium mb-1">
                  Change Profile Image
                </label>
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
              <label className="block text-sm font-medium mb-1">
                Email (read-only)
              </label>
              <input
                type="email"
                value={profile?.emailId}
                disabled
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  Member Since:{" "}
                  <span className="font-medium">
                    {profile?.createdAt
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

        {/* Lightbox for Image Preview */}
        {showPreview && (
          <Lightbox
            open={showPreview}
            close={() => setShowPreview(false)}
            slides={[{ src: imageToShow }]}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
