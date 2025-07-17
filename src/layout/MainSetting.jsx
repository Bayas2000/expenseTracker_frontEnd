import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Store/AuthSlice";
import api from "../api/api";
import useLogout from "@/components/custom_hooks/useLogout";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useLogout();
  const theme = useSelector((state) => state.theme.mode);

  const [profile, setProfile] = useState({
    userName: "",
    emailId: "",
    profileImage: "",
    createdAt: "",
  });

  const [form, setForm] = useState({
    userName: "",
    profileImage: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  useEffect(() => {
    api.get("/userAuth/get-user").then((res) => {
      const data = res.data.data;
      setProfile(data);
      setForm((prev) => ({ ...prev, userName: data.userName }));
      dispatch(getUserData(data));
    });
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("userName", form.userName);
    if (form.profileImage) formData.append("profileImage", form.profileImage);
    if (form.newPassword && form.newPassword === form.confirmPassword) {
      formData.append("currentPassword", form.currentPassword);
      formData.append("newPassword", form.newPassword);
    }

    try {
      const res = await api.put("/userAuth/update-profile", formData);
      setProfile(res.data.data);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4  ">
        <div className="flex items-center space-x-3 p-4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 bg-white rounded-xl shadow-lg dark:bg-gray-900">
      
      {/* Profile Image */}
      <div className="space-y-3">
        {/* <label className="font-medium text-sm text-gray-600 dark:text-gray-300">
          Profile Image
        </label> */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            onClick={() => setShowPreview(true)}
            src={previewImage || profile.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 cursor-pointer shadow-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
        </div>
      </div>

      {/* Username and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Username
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
            name="userName"
            value={form.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Email (read-only)
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-white"
            value={profile.emailId}
            disabled
          />
        </div>
      </div>

      {/* Change Password */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
          Change Password
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
          Notifications
        </h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) =>
                setNotifications({ ...notifications, email: e.target.checked })
              }
              className="w-5 h-5"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Push Notifications</span>
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) =>
                setNotifications({ ...notifications, push: e.target.checked })
              }
              className="w-5 h-5"
            />
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t">
        <button
          onClick={logout}
          className="w-full sm:w-auto px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm"
        >
          Log Out
        </button>
        <button
          onClick={handleUpdate}
          className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
        >
          Save Changes
        </button>
      </div>

      {showPreview && (
        <Lightbox
          open={showPreview}
          close={() => setShowPreview(false)}
          slides={[{ src: previewImage || profile.profileImage }]}
        />
      )}
    </div>
    </>
  );
};

export default MainSettings;
