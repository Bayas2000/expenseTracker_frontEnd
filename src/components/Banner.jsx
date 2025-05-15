import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import Select from "react-select";
import "../index.css";
import { DateFilter, LoadBannerDetails } from "../Store/Banner";
import { FaMoneyBillWave, FaMoneyCheckAlt, FaWallet } from "react-icons/fa";

const Banner = () => {
  const bannerState = useSelector((state) => state.banner?.banner_list);
  const mode = useSelector((state) => state.theme.mode);

  const dispatch = useDispatch();
  const [days, setDays] = React.useState({ value: "today", label: "Today" });
  const [pageRender, setPageRender] = React.useState(false);

  useEffect(() => {
    if (days) {
      const filter = days.value;
      dispatch(LoadBannerDetails(filter));
      dispatch(DateFilter(filter));
      setPageRender(!pageRender);
    }
  }, [days]);

  const [bannerData, setBannerDetails] = React.useState({
    myEarnings: "",
    myExpenses: "",
    balance: "",
  });
  useEffect(() => {
    if (bannerState) {
      setBannerDetails(bannerState);
    }
  }, [bannerState]);

  const daysOption = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "thisWeek", label: "This Week" },
    { value: "thisMonth", label: "This Month" },
    { value: "thisYear", label: "This Year" },
  ];

  return (
    <div className="relative max-w-6xl mx-auto p-6">
       <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center gap-2 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-all mt-1 cursor-pointer"
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

          <h1
            className={`${
              mode === "dark" ? "text-white" : "text-gray-800"
            } text-3xl font-extrabold tracking-tight`}
          >
            Financial Summary
          </h1>
        </div>

        {/* Filter Dropdown */}
        <Select
          className="w-[160px] mt-4 md:mt-0"
          value={days}
          onChange={(selectedOption) => setDays(selectedOption)}
          options={daysOption}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "0.75rem",
              padding: "3px 6px",
              borderColor: "#d1d5db",
              boxShadow: "none",
              fontSize: "0.875rem",
            }),
          }}
        />
      </div>

      {/* Stat Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Box */}
        {[
          {
            label: `${days?.label} Earnings`,
            value: bannerData?.myEarnings,
            color: "green",
            icon: (
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.105 0-2 .672-2 1.5s.895 1.5 2 1.5 2-.672 2-1.5-.895-1.5-2-1.5z M12 13v2m8 2a9.956 9.956 0 01-6 1.944A9.956 9.956 0 014 17V7a9.956 9.956 0 016-1.944A9.956 9.956 0 0120 7v10z"
                />
              </svg>
            ),
          },
          {
            label: `${days?.label} Expenses`,
            value: bannerData?.myExpenses,
            color: "red",
            icon: (
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9z"
                />
              </svg>
            ),
          },
          {
            label: `Balance`,
            value: bannerData?.balance,
            color: "blue",
            icon: (
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ),
          },
        ].map(({ label, value, color, icon }, idx) => (
          <div
            key={idx}
            className={`${
              mode == "dark" ? "bg-[#f5f6fa] text-[#2D3A45]" : "bg-white/70"
            }  backdrop-blur-md border ${
              color === "green"
                ? "border-green-200"
                : color === "red"
                ? "border-red-200"
                : "border-blue-200"
            } shadow-lg rounded-xl p-5 flex items-center justify-between`}
          >
            <div>
              <p
                className={`text-sm  ${
                  mode == "dark" ? " text-black" : "text-gray-500"
                }`}
              >
                {label}
              </p>
              <p className={`text-2xl font-bold text-${color}-600`}>
                {value ?? 0}
              </p>
            </div>
            <div className="p-2 rounded-full bg-white shadow">{icon}</div>
          </div>
        ))}
      </div>
    </div>

    // <div
    //   className={`bg-[#2A3A47] h-auto p-4  mt-5 rounded-lg lg:w-[95%]  w-[100%] shadow-sm
    //   ${mode == "dark" ? "bg-[#2A3A47]" : "bg-white"}
    //   `}
    // >
    //   <div className=" flex items-end justify-end ">
    //     {/* <input
    //       className={`w-[150px] border-[1px] border-gray-300 rounded-sm text-sm pl-2 mr-2 h-[38px] ${
    //         mode === "dark"
    //           ? "text-white placeholder-white bg-gray-800"
    //           : "text-black placeholder-gray-500 bg-white"
    //       }`}
    //       placeholder="Search the expenses"
    //     /> */}

    // <div className=" mt-1 ">
    //   <Select
    //     className={`rounded-md mr-5 text-sm  text-gray-500 bg-[#f5f6fa]
    //       ${
    //         mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-[#f5f6fa]"
    //       }`}
    //     options={daysOption}
    //     value={days}
    //     onChange={(selectedOption) => {
    //       setDays(selectedOption);
    //     }}
    //   />
    // </div>
    //   </div>
    //   {/* <div className="">
    //     <div
    //       className={` ${
    //         mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-[#f5f6fa]"
    //       }  h-[60%] mx-5 mt-4 p-4 rounded-xl`}
    //     >
    //       <div className=" flex justify-between">
    //         <p className=" text-sm font-semibold ">{days?.label} Earnings</p>
    //         <span className=" text-sm text-green-800 font-semibold">
    //           {bannerData?.myEarnings || 0}
    //         </span>
    //       </div>
    //       <div className=" flex justify-between mt-2">
    //         <p className=" text-sm font-semibold">{days?.label} Expense</p>
    //         <span className=" text-sm  text-red-600 font-semibold">
    //           {bannerData?.myExpenses || 0}
    //         </span>
    //       </div>
    //       <div className=" h-[1px] bg-gray-300 mt-2" />
    //       <div className=" flex justify-between mt-1">
    //         <p className=" text-sm font-semibold">Balance</p>
    //         <span className=" text-sm  text-blue-600 font-semibold">
    //           {bannerData?.balance || 0}
    //         </span>
    //       </div>
    //     </div>
    //   </div> */}
    // </div>
  );
};

export default Banner;
