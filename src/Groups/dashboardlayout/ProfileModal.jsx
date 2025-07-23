import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import profileModalIcon from "../../assets/profileAvatar.jpg";

const ProfileModal = ({ modalRef }) => {
  const UserData = useSelector((state) => state.Auth.UserData);
  const navigate = useNavigate();

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (UserData?._id) {
      navigator.clipboard.writeText(UserData._id);
      setCopied(true);
      toast.info("Connection ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      ref={modalRef}
      className="absolute right-0 mt-3 bg-white shadow-xl rounded-md z-50 w-64 animate-fade-in"
    >
      {/* Profile Info */}
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={UserData?.profileImage || profileModalIcon}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {UserData?.userName}
          </span>
          <span className="text-xs text-gray-600 flex items-center gap-1">
            Connection ID
            <button
              onClick={handleCopy}
              className="group relative flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                viewBox="0 -960 960 960"
                width="16"
                fill="#666"
                className="transition-transform duration-200 group-hover:scale-110"
              >
                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
              </svg>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
          </span>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Action Menu */}
      <ul className="text-sm">
        <li
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill="#434343"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Z" />
          </svg>
          Profile
        </li>

        <li
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill="#434343"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
          Home Dashboard
        </li>
      </ul>
    </div>
  );
};

export default ProfileModal;
