import React, { useEffect, useState } from "react";
import profileModalIcon from "../../assets/userModal.png";
import { useDispatch, useSelector } from "react-redux";
import { ListNotificationDetails } from "../../Store/Groups/header";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({ modalRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data = [] } = useSelector(
    (state) => state.groupHeader?.notification_list || {}
  );

  const [responded, setResponded] = useState({});

  // Load responded notifications from localStorage on mount
  useEffect(() => {
    dispatch(ListNotificationDetails());

    const storedResponses =
      JSON.parse(localStorage.getItem("respondedNotifications")) || {};
    setResponded(storedResponses);
  }, [dispatch]);

  const handleResponse = async (item, response) => {
    const payload = {
      groupId: item.groupId,
      inviteResponse: response,
    };

    try {
      await api.post("/groupMember/inviteResponse", payload);

      // Update local state and localStorage
      const updatedResponses = { ...responded, [item.groupId]: true };
      setResponded(updatedResponses);
      localStorage.setItem(
        "respondedNotifications",
        JSON.stringify(updatedResponses)
      );
    } catch (error) {
      console.error("Failed to send response:", error);
    }
  };

  return (
    <div
      ref={modalRef}
      className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-800">Notifications</h2>
      </div>

      {/* Notification List */}
      <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
        {data.length > 0 &&
        data.some((data) => data.inviteStatus == "Pending") ? (
          data
            .filter((data) => data.inviteStatus == "Pending")
            .map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 items-start hover:bg-gray-50 transition"
              >
                <img
                  src={item.icon || profileModalIcon}
                  alt="icon"
                  className="w-10 h-10 rounded-full bg-gray-100"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">{item.message}</p>

                  {item.type === "Invitation" && (
                    <div>
                      {responded[item.groupId] ? (
                        <span className="text-green-600 text-sm font-medium">
                          Response sent
                        </span>
                      ) : (
                        <div className="flex gap-2">
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
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
        ) : (
          <p className="text-center py-6 text-gray-500 text-sm">
            No new notifications.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-center">
        <button
          onClick={() => navigate("/business/notifications")}
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
