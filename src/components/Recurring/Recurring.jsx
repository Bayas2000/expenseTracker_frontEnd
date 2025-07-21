import React from "react";
import { RepeatIcon } from "lucide-react"; 

const Recurring = () => {
  return (
    <div className="bg-white min-h-80 m-4 mt-6 shadow-md rounded-xl flex flex-col justify-center items-center p-6 text-center">
      <div className="mb-4">
        <RepeatIcon className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-gray-600 text-lg font-semibold mb-1">
        No Recurring Expenses
      </h3>
      <p className="text-gray-500 max-w-xs">
        Start adding your recurring expenses like monthly subscriptions or bills
        to keep track of them easily.
      </p>
    </div>
  );
};

export default Recurring;
