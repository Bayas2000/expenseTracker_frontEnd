import React from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Setting = () => {
  const mode = useSelector((state) => state.theme.mode);
  const [feedbackModal, setFeedbackModal] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [deleteModal, setDeleteModal] = React.useState(false);

  const handleReset = () => {
    api
      .delete("transaction/reset")
      .then(() => {
        toast.warning("All data has been cleared");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const handleSubmit = () => {
    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty");
      return;
    }

    toast.success("Successfully sent the feedback");
    setFeedback("");
    setFeedbackModal(false);
  };

  return (
    <div className=" overflow-hidden lg:w-[80%]">
      {/* <div className=" lg:w-[80%]  bg-white mt-5 rounded-lg   shadow-sm">
        <h2 className=" text-xl font-semibold p-3 pl-6">Settings</h2>
        <div className=" h-[1px] w-[100%] bg-gray-200" />
        <div className=" flex lg:items-center md:items-center sm:items-center lg:flex-row md:flex-row  sm:flex-row flex-col items-start pb-4">
          <div className=" flex flex-col p-3">
            <span className=" ml-3 text-sm  ">Currency</span>
            <input
              className=" border-1 border-gray-300 p-2 rounded-sm mt-1 text-sm  ml-3 lg:min-w-[300px] md:min-w-[300px] sm:min-w-[250px] w-[90%]"
              placeholder="Enter the Currency name"
            />
          </div>
          <div className=" flex flex-col px-3 py-1">
            <span className=" ml-3 text-sm  ">Min Monthly Income</span>
            <input
              className=" border-1 border-gray-300 p-2 rounded-sm mt-1 text-sm ml-3 lg:min-w-[300px] md:min-w-[300px] sm:min-w-[250px] w-[90%]"
              placeholder="Enter the Income"
            />
          </div>
        </div>
      </div> */}
      <div
        className={`${
          mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        } lg:w-[80%] mt-5 rounded-lg p-4  shadow-sm`}
      >
        <h2 className=" text-xl font-semibold p-2">Feedback</h2>
        <div className=" h-[1px] w-[100%] bg-gray-200" />
        <p className=" text-sm ml-3 mt-2">
          I would love to hear your feedback. Please let me know if you have any
        </p>{" "}
        <div className=" flex">
          <p className=" ml-3 text-sm">
            {" "}
            suggestions or issues with the app. You can reach out to me at
            <span
              className=" text-blue-500 whitespace-nowrap ml-1 text-sm cursor-pointer"
              onClick={() => setFeedbackModal(true)}
            >
              Feedback
            </span>
          </p>
        </div>
      </div>
      <div
        className={` ${
          mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        } lg:w-[80%] h-[20vh] mt-5 rounded-lg  shadow-sm`}
      >
        <h2 className=" text-xl font-semibold p-3 pl-5">Reset All Data</h2>
        <div className=" h-[1px] w-[100%] bg-gray-200" />
        <div
          className=" flex justify-end items-center mr-5 pb-6"
          onClick={() => setDeleteModal(true)}
        >
          <button
            className={` bg-red-300 hover:bg-red-200 p-2 rounded-lg mt-[1rem] ml-5 w-[90%] max-w-[100px]  ${
              mode == "dark"
                ? "bg-red-700 hover:bg-red-600 text-white"
                : "bg-red-300 hover:bg-red-600 text-black"
            }`}
          >
            Reset
          </button>
        </div>
      </div>
      {feedbackModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
          <div
            className={`w-full max-w-md rounded-2xl shadow-lg p-4 ${
              mode === "dark"
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-900"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between pb-2 border-b ${
                mode === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2 className="text-xl font-semibold">Feedback Form</h2>
              <button
                onClick={() => setFeedbackModal(false)}
                className={`${
                  mode === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="pt-4 pb-6">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback..."
                className={`w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 ${
                  mode === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-300"
                }`}
              />
            </div>

            {/* Footer */}
            <div
              className={`flex justify-end gap-2 border-t pt-3 ${
                mode === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setFeedbackModal(false)}
                className={`px-4 py-2 text-sm rounded-lg ${
                  mode === "dark"
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className=" fixed flex justify-center items-center inset-0 z-index-60 bg-black/30 h-[44]">
          <div
            className={` ${
              mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-[#FFFFFF]"
            }  min-h-40  min-w-[30%] rounded-lg`}
          >
            <div className=" flex justify-between">
              <h1 className=" font-semibold text-[20px] p-3">Confirmation !</h1>
              <button
                className=" pr-4 cursor-pointer"
                onClick={() => setDeleteModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#666666"
                >
                  <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
                </svg>
              </button>
            </div>
            <div className=" h-[1px] bg-gray-200 width-[100%] " />
            <p className="p-4 ">Are you sure you want to Reset All records? </p>
            <div className=" h-[1px] bg-gray-200 width-[100%] mt-3" />
            <div className=" flex items-center justify-end gap-x-2  p-2">
              <button
                className=" bg-blue-400 p-1 px-3 rounded-lg mt-1"
                onClick={() => setDeleteModal(false)}
              >
                Close
              </button>
              <button
                className="bg-red-400 p-1 px-3 rounded-lg mt-1"
                onClick={() => handleReset()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
