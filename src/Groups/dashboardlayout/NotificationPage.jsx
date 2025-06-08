// src/pages/NotificationPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListNotificationDetails } from "../../Store/Groups/header";
import profileModalIcon from "../../assets/userModal.png";
import api from "@/api/api";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { data = [] } = useSelector(
    (state) => state.groupHeader?.notification_list || {}
  );

  useEffect(() => {
    dispatch(ListNotificationDetails());
  }, [dispatch]);

  const handleResponse = async (item, response) => {
    const payload = {
      groupId: item.groupId,
      inviteResponse: response,
    };

    try {
      await api.post("/groupMember/inviteResponse", payload);
      dispatch(ListNotificationDetails());
    } catch (error) {
      console.error("Failed to send response:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className=" flex items-center mb-6 gap-4">
        <button
          className="flex items-center gap-2 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-all  cursor-pointer"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="currentColor"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <span className="text-sm font-semibold">Back</span>
        </button>
        <h1 className="text-2xl font-semibold ">All Notifications</h1>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center mt-52">
          No notifications available.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-white shadow-sm rounded-md border border-gray-100"
            >
              <img
                src={item.icon || profileModalIcon}
                alt="icon"
                className="w-10 h-10 rounded-full bg-gray-100"
              />
              <div>
                <p className="text-sm text-gray-800">{item.message}</p>
                {/* <p className="text-xs text-gray-500 mt-1">
                  {item.inviteStatus}
                </p> */}
                {item.type === "Invitation" &&
                item.inviteStatus == "Pending" ? (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleResponse(item, "Accepted")}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleResponse(item, "Rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p
                    className={`${
                      item.inviteStatus == "Accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    } text-sm`}
                  >
                    {item.inviteStatus}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
