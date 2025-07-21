import React from "react";
import { useSelector } from "react-redux";
import { X } from "lucide-react";

const RecurringModal = ({ openRecurringModal, setOpenRecurringModal }) => {
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  const handleClose = () => {
    setOpenRecurringModal(false);
  };

  return (
    <>
      {openRecurringModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div
            className={`w-[95%] max-w-lg m-4 p-5 rounded-2xl shadow-xl transition-all duration-300
              ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Recurring Expense</h2>
              <button onClick={handleClose}>
                <X className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {/* Type and Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="subscription">Subscription</option>
                    <option value="bill">Bill</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Netflix"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Amount and Payment Day */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    placeholder="e.g. 12.99"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Day</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    min="1"
                    max="31"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* First Payment Date and Recurrence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Payment Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Recurrence</label>
                  <input
                    type="text"
                    value="Monthly"
                    disabled
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              >
                Save Recurring Expense
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RecurringModal;
