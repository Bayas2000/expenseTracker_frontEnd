import React from "react";
import profileModalIcon from "../../assets/profileAvatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileModalHome = ({ modalRef, logout }) => {
  const UserData = useSelector((state) => state.Auth.UserData);
  const Navigate = useNavigate();

  const [copied, setCopied] = React.useState(false);

  console.log(UserData, "UserData");

  const handleCopy = () => {
    if (UserData?._id) {
      navigator.clipboard.writeText(UserData._id);
      setCopied(true);
      toast.info("Connection ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="absolute right-5 md:top-13.5 top-10 mt-3 md:w-80 w-fit bg-white shadow-lg rounded-b-md z-50">
      {/* Profile info */}
      <h1 className="text-lg font-semibold pt-4 px-4">My Profile</h1>
      <div className="flex items-center justify-start p-4">
        <img
          src={UserData?.profileImage || profileModalIcon}
          alt="Profile"
          className="w-20 h-20 bg-gray-200 p-1 rounded-full"
        />

        <div className="ml-3">
          <p className="text-sm font-semibold">{UserData?.userName}</p>
          <p className="text-sm flex gap-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#434343"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
            {UserData?.emailId}
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <ul>
        <li className="">
          <Link
            to={"/profile"}
            className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            Profile
          </Link>
        </li>
        <li>
          <Link
            to={"/setting"}
            className="py-2 px-4 hover:bg-gray-100 flex items-center gap-2 cursor-pointer font-medium"
          >
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
          </Link>
        </li>
        <hr className="border-gray-200" />
        <li
          onClick={() => logout()}
          className="py-2 px-4  flex items-center gap-2 cursor-pointer font-medium"
        >
          <button className="hover:bg-blue-300 w-full p-2 rounded-lg border-[1px]">
            LogOut
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileModalHome;
