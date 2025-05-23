import React from "react";
import profileModalIcon from "../../assets/profileAvatar.jpg";
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
      className="absolute right-2 mt-3 bg-white shadow-lg rounded-md z-50  "
    >
      {/* Profile info */}
      <div className="flex items-center pr-6  p-4 ">
        <img
          src={UserData?.profileImage || profileModalIcon}
          alt="Profile"
          className="w-10 h-10 bg-gray-200 p-1 rounded-full"
        />

        <div className="ml-3">
          <p className="text-sm font-semibold">{UserData?.userName}</p>
          <p className="text-[12px] text-gray-600 flex items-center gap-1 mr-4">
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
       
        <hr className="border-gray-200" />
        <li
          onClick={() => Navigate("/")}
          className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer font-medium"
        >
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>

          Profile
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
