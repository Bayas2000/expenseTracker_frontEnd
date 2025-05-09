import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useSelector } from "react-redux";

const Stats = () => {

  const mode = useSelector((state) => state.theme.mode);

  const [savingsRate, setSavingsRate] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [topCategories, setTopCategories] = useState([]);
  const [filterType, setFilterType] = React.useState("thisWeek");

  const filterMap = [
    { label: "Weekly", value: "thisWeek" },
    { label: "Monthly", value: "thisMonth" },
    { label: "Yearly", value: "thisYear" },
  ];

  useEffect(() => {
    const params = { dateFilter: filterType };
    api
      .get("/transaction/top-categories", { params })
      .then((res) => {
        const data = res.data.data;
        setTopCategories(data);
      })
      .catch((error) => {
        console.log(error, "error");
      });

    api
      .get("/transaction/financial-health", { params })
      .then((res) => {
        const data = res.data.data[0].savingsRate;
        const spenddata = res.data.data[0].totalExpense;
        setSavingsRate(data);
        setTotalSpend(spenddata);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, [filterType]);

 const categoryColors = {
  "Food & Drinks": "#60A5FA", // blue-400
  Travel: "#FBBF24",          // yellow-400
  Groceries: "#34D399",       // green-400
  Loan: "#F87171",            // red-400
  Beauty: "#D946EF",          // purple-400
  Education: "#A78BFA",       // indigo-400
  Others: "#9CA3AF",          // gray-400
  Business: "#FFA500",        // orange
  Salary: "#AFE1AF",          // light green
  Investment: "#F59E0B",      // amber-500
  "Wifi": "#3B82F6", // blue-500
};


  return (
    <div className="lg:w-[80%] max-w-[750px]">
      <div
        className={` ${
          mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        } min-h-[20vh]  text-[#2D3A45] mt-5 rounded-lg p-4 shadow-sm`}
      >
        <h2 className="font-semibold text-red-700 text-[24px] ">
          {totalSpend}
        </h2>
        <p className="text-[14px]  ">Total Spend</p>

        <div className="flex gap-4 mt-2">
          {filterMap.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilterType(type.value)}
              className={`px-2 py-1 rounded-full text-sm cursor-pointer shadow-md ${
                filterType === type.value
                  ? "bg-blue-600 text-white"
                  : "bg-blue-300 text-white"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={` ${
          mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        } min-h-[20vh]  mt-5 rounded-lg shadow-sm`}
      >
        <h2 className="text-xl font-semibold p-3 pl-6">Financial Health</h2>
        <div className="h-[1px] w-full bg-gray-200" />
        <div className=" flex justify-between items-center">
          <h3 className="pl-6 mt-2 font-semibold">Savings Rate</h3>
          <p className="text-sm mr-6 mt-1 font-semibold">
            {savingsRate.toFixed(1)}%
          </p>
        </div>

        <div className="ml-6 mt-2 mx-4 w-[80%] bg-gray-200 rounded-lg h-4 relative">
          <div
            className={`h-full rounded-lg transition-all duration-700 ease-out ${
              savingsRate < 30
                ? "bg-red-500"
                : savingsRate < 70
                ? "bg-yellow-400"
                : "bg-green-500"
            }`}
            style={{ width: `${savingsRate}%` }}
          />
        </div>
      </div>
      <div
        className={` ${
          mode == "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        } min-h-[20vh] mt-5 pb-2 rounded-lg shadow-sm`}
      >
        <h2 className="text-xl font-semibold p-3 pl-6">Top Categories</h2>
        <div className="h-[1px] w-full bg-gray-200" />

        {topCategories.length > 0 &&
          topCategories.map((data) => (
            <div className=" shadow-lg border-[1px] border-gray-200 m-4 p-2 rounded-md">
              <div className=" flex justify-between ml-3 items-center">
                <div className=" flex items-center">
                  <img
                    src={data.categoryIcon}
                    alt=""
                    className=" w-8 h-8  object-cover"
                  />
                  <div>
                    <>
                      <h2 className=" pl-3 font-semibold">
                        {data.categoryName}
                      </h2>
                      <div className=" flex">
                        <h2 className="pl-3 font-semibold">
                          {data?.spendings.toFixed(0)}%
                        </h2>
                        <span className=" pl-1">of spending</span>
                      </div>
                    </>
                  </div>
                </div>

                <span className=" text-end font-semibold">{data.amount}</span>
              </div>
              <div className=" mx-4 w-[83%] bg-gray-200 rounded-lg h-2 relative mt-1 ">
                <div
                  className={`h-full rounded-lg transition-all duration-700 ease-out ${
                    data.categoryName == "Food & Drinks"
                      ? "bg-blue-300"
                      : data.spendings < 70
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${data.spendings}%`,
                    backgroundColor:
                      categoryColors[data.categoryName] || "#A1A1AA",
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stats;
