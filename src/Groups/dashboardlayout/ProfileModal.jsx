import React from "react";
import profileModalIcon from "../../assets/userModal.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileModal = ({ modalRef }) => {
  const UserData = useSelector((state) => state.Auth.UserData);
  const Navigate = useNavigate();

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
      className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-md z-50"
    >
      {/* Profile info */}
      <div className="flex items-center p-3">
        <img
          src={profileModalIcon}
          alt="Profile"
          className="w-10 h-10 bg-gray-200 p-1 rounded-full"
        />

        <div className="ml-3">
          <p className="text-sm font-semibold">{UserData?.userName}</p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            ConnectionID: <span className="text-black">{UserData?._id}</span>
            <span
              onClick={handleCopy}
              className=" flex items-center gap-1 cursor-pointer group relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 -960 960 960"
                width="18"
                fill="#666"
                className="transition-transform duration-200 group-hover:scale-110"
              >
                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
              </svg>

              {/* Tooltip Label */}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {copied ? "Copied!" : "Copy"}
              </span>
            </span>
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <ul>
        <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill="#434343"
          >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </svg>
          Settings
        </li>
        <hr className="border-gray-200" />
        <li
          onClick={() => Navigate("/")}
          className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="#434343"
          >
            {" "}
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
          Go to Home Dashboard
        </li>
      </ul>
    </div>
  );
};

export default ProfileModal;
