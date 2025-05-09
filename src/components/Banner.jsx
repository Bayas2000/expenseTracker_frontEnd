import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import Select from "react-select";
import "../index.css";
import { DateFilter, LoadBannerDetails } from "../Store/Banner";
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
    <div
      className={`bg-[#2A3A47] h-auto p-4  mt-5 rounded-lg lg:w-[95%]  w-[100%] shadow-sm
      ${mode == "dark" ? "bg-[#2A3A47]" : "bg-white"}
      `}
    >
      <div className=" flex items-end justify-end ">
        {/* <input
          className={`w-[150px] border-[1px] border-gray-300 rounded-sm text-sm pl-2 mr-2 h-[38px] ${
            mode === "dark"
              ? "text-white placeholder-white bg-gray-800"
              : "text-black placeholder-gray-500 bg-white"
          }`}
          placeholder="Search the expenses"
        /> */}

        <div className=" mt-1 ">
          <Select
            className={`rounded-md mr-5 text-sm  text-gray-500 bg-[#f5f6fa] 
              ${
                mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-[#f5f6fa]"
              }`}
            options={daysOption}
            value={days}
            onChange={(selectedOption) => {
              setDays(selectedOption);
            }}
          />
        </div>
      </div>
      <div className="">
        <div
          className={` ${
            mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-[#f5f6fa]"
          }  h-[60%] mx-5 mt-4 p-4 rounded-xl`}
        >
          <div className=" flex justify-between">
            <p className=" text-sm font-semibold ">{days?.label} Earnings</p>
            <span className=" text-sm text-green-800 font-semibold">
              {bannerData?.myEarnings || 0}
            </span>
          </div>
          <div className=" flex justify-between mt-2">
            <p className=" text-sm font-semibold">{days?.label} Expense</p>
            <span className=" text-sm  text-red-600 font-semibold">
              {bannerData?.myExpenses || 0}
            </span>
          </div>
          <div className=" h-[1px] bg-gray-300 mt-2" />
          <div className=" flex justify-between mt-1">
            <p className=" text-sm font-semibold">Balance</p>
            <span className=" text-sm  text-blue-600 font-semibold">
              {bannerData?.balance || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
