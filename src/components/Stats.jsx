
import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { set } from "lodash";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const mode = useSelector((state) => state.theme.mode);

  const [savingsRate, setSavingsRate] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [topCategories, setTopCategories] = useState([]);
  const [filterType, setFilterType] = useState("thisWeek");
  const [isLoadingHealth, setIsLoadingHealth] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const navigate = useNavigate();


  const filterMap = [
    { label: "Weekly", value: "thisWeek" },
    { label: "Monthly", value: "thisMonth" },
    { label: "Yearly", value: "thisYear" },
  ];

  useEffect(() => {
    const params = { dateFilter: filterType };

    // Top Categories Loading
    setIsLoadingCategories(true);
    api
      .get("/transaction/top-categories", { params })
      .then((res) => setTopCategories(res.data.data))
      .catch((error) => console.log(error))
      .finally(() => setTimeout(() => setIsLoadingCategories(false), 500));

    // Financial Health Loading
    setIsLoadingHealth(true);
    api
      .get("/transaction/financial-health", { params })
      .then((res) => {
        const { savingsRate, totalExpense } = res.data.data[0];
        setSavingsRate(savingsRate);
        setTotalSpend(totalExpense);
      })
      .catch((error) => console.log(error))
      .finally(() => setTimeout(() => setIsLoadingHealth(false), 500));
  }, [filterType]);

  const categoryColors = {
    "Food & Drinks": "#60A5FA",
    Travel: "#FBBF24",
    Groceries: "#34D399",
    Loan: "#F87171",
    Beauty: "#D946EF",
    Education: "#A78BFA",
    Others: "#9CA3AF",
    Business: "#FFA500",
    Salary: "#AFE1AF",
    Investment: "#F59E0B",
    Wifi: "#3B82F6",
  };

  return (
    <div className="lg:w-[80%] max-w-[850px] mx-auto mt-8 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Financial Stats</h1>
        </div>
      </div>

      {/* Total Spend */}
      <div
        className={`rounded-xl shadow-md p-5 mb-6 transition-all ${
          mode === "dark" ? "bg-[#F1F1F1]" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold text-red-600">{totalSpend}</h2>
        <p className="text-sm text-gray-500 mt-1">Total Spend</p>

        <div layout className="flex gap-3 mt-4">
          {filterMap.map(({ label, value }) => (
            <button
              key={value}
              layout
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                filterType === value
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Financial Health */}
      <div
        className={`rounded-xl shadow-md mb-6 ${
          mode === "dark" ? "bg-[#F1F1F1]" : "bg-white"
        }`}
      >
        <h3 className="text-xl font-semibold p-5 pb-0">Financial Health</h3>
        <div className="px-5 pt-2 pb-4">
          {isLoadingHealth ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full w-full"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Savings Rate</span>
                <span className="font-semibold">{savingsRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    savingsRate < 30
                      ? "bg-red-500"
                      : savingsRate < 70
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${savingsRate}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Top Categories */}
      <div
        className={`rounded-xl shadow-md min-h-50 mb-10 ${
          mode === "dark" ? "bg-[#F1F1F1]" : "bg-white"
        }`}
      >
        <h3 className="text-xl font-semibold p-5 pb-0">
          Top Spending Categories
        </h3>
        <div className="divide-y px-5">
          {isLoadingCategories ? (
            <div className="space-y-4 py-6">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="animate-pulse space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full" />
                      <div className="space-y-1">
                        <div className="w-24 h-4 bg-gray-300 rounded" />
                        <div className="w-16 h-3 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div className="w-12 h-4 bg-gray-300 rounded" />
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          ) : topCategories.length > 0 ? (
            <motion.div layout>
              {topCategories.map((cat, idx) => (
                <motion.div
                  layout
                  key={idx}
                  className="py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={cat.categoryIcon}
                        alt={cat.categoryName}
                        className="w-8 h-8 object-contain"
                      />
                      <div>
                        <p className="font-medium">{cat.categoryName}</p>
                        <p className="text-xs text-gray-500">
                          {cat.spendings.toFixed(0)}% of spending
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">
                      ₹ {cat.amount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${cat.spendings}%`,
                        backgroundColor:
                          categoryColors[cat.categoryName] || "#A1A1AA",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-sm text-gray-400 py-6 text-center pt-12">
              No data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;

const Spinner = () => (
  <div className="flex justify-center items-center py-4">
    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);
