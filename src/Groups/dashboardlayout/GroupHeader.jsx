import React, { useState, useRef, useEffect } from "react";
import profile from "../../assets/profileAvatar.jpg";
import ProfileModal from "./ProfileModal";
import NotificationModal from "./NotificationModal";
import { useDispatch, useSelector } from "react-redux";
import {
  ListNotificationDetails,
  NotificationAnimate,
} from "@/Store/Groups/header";

const GroupHeader = () => {
  const { data = [] } = useSelector(
    (state) => state.groupHeader?.notification_list || {}
  );
  const notificationAvailable = useSelector(
    (state) => state.groupHeader?.notification_animate
  );
  const UserData = useSelector((state) => state.Auth.UserData);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const profileModalRef = useRef(null);
  const NotificationModalRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ListNotificationDetails()); 
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(data)) return;

    const hasPending = data.some((item) => item.inviteStatus === "Pending");
    dispatch(NotificationAnimate(hasPending));
  }, [data]);

  // Close profile modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target)
      ) {
        setIsProfileModalOpen(false);
      }
    };
    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen]);

  // Close notification modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        NotificationModalRef.current &&
        !NotificationModalRef.current.contains(event.target)
      ) {
        setIsNotificationModalOpen(false);
      }
    };
    if (isNotificationModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationModalOpen]);

  return (
    <header className="bg-white shadow-sm h-[60px] px-4 flex justify-end items-center gap-6 relative border-b border-gray-200 sticky top-0">
      {/* Notification Button */}
      <div className="relative">
        <button
          onClick={() => setIsNotificationModalOpen((prev) => !prev)}
          aria-label="Notifications"
          className="text-gray-600 hover:text-gray-800 transition-colors mt-2 relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            viewBox="0 -960 960 960"
            width="26"
            fill="currentColor"
          >
            <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>

          {/* Notification badge */}
          {notificationAvailable == true && (
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-ping"></span>
          )}
        </button>

        {isNotificationModalOpen && (
          <NotificationModal
            modalRef={NotificationModalRef}
            setIsNotificationModalOpen={setIsNotificationModalOpen}
          />
        )}
      </div>

      {/* Profile Image */}
      <div className="relative">
        <img
          src={UserData?.profileImage || profile}
          alt="User profile"
          className="h-8 w-8 rounded-full border-2 border-gray-300 hover:border-blue-500 cursor-pointer transition-all duration-150"
          onClick={() => setIsProfileModalOpen((prev) => !prev)}
        />

        {isProfileModalOpen && <ProfileModal modalRef={profileModalRef} />}
      </div>
    </header>
  );
};

export default GroupHeader;
