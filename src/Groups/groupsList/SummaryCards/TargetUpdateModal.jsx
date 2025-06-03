import React from "react";
import { Dialog } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import api from "@/api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ListGroupRecords } from "@/Store/Groups/groupsList";

const TargetUpdateModal = ({ isOpen, onClose, groupDetails }) => {
  const dispatch = useDispatch();
  const currentMonth = moment().format("MMMM"); // e.g., "May"
  const currentYear = moment().year(); // e.g., 2025

  const currentTarget = groupDetails[0]?.monthlyTargetHistory?.find(
    (item) => item.month === currentMonth && item.year === currentYear
  );
  const [amount, setAmount] = React.useState(currentTarget?.targetAmount || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTarget = {
      _id: groupDetails[0]?._id,
      newTarget: parseFloat(amount),
    };
    
    try {
      await api.put("/group/update-monthly-target", updatedTarget);
      dispatch(ListGroupRecords(groupDetails[0]?._id));
      toast.info("Target updated successfully");
      setAmount('')
      onClose();
    } catch (error) {
      console.error("Error updating target:", error);
      toast.error("Failed to update target. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <IoClose size={20} />
          </button>
          <Dialog.Title className="text-lg font-semibold mb-4 text-gray-800">
            Update Current Month Target
          </Dialog.Title>

          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <input
                type="text"
                value={currentMonth}
                readOnly
                className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="text"
                value={currentYear}
                readOnly
                className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="pt-4 text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TargetUpdateModal;
