import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import api from "@/api/api";
import { ListInvestmentDetails } from "@/Store/Groups/groupsList";

const UpdateTransaction = ({ showModal, setShowModal, groupId, rows }) => {
  const dispatch = useDispatch();
  console.log(rows, "rows");

  const [members, setMembers] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (rows) {
      setAmount(rows.amount);
      if (rows.investmentDate) {
        setDate(rows.investmentDate.split("T")[0]);
      }
      setNotes(rows.notes);
    }
  }, [rows]);

  const handleAddTransaction = () => {
    if (!members) {
      alert("Please fill in all fields");
      return;
    }
    const payload = {
      _id: rows._id,
      groupId: rows.groupId,
      memberId: rows.memberId,
      amount: Number(amount),
      notes: notes,
      investmentDate: date,
    };

    api
      .put("/investment/update", payload)
      .then((res) => {
        dispatch(ListInvestmentDetails());
        toast.success("Transaction added successfully");
        setShowModal(false);
        setMembers("");
        setDate(null);
        setNotes("");
        setAmount("");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-9999 bg-black/50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold my-2 px-6">
              Update Transaction
            </h2>
            <hr className="my-2" />

            <div className="max-h-[400px] min-h-[250px] overflow-y-auto px-6 w-full">
              <div className=" grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-3 w-full ">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    size={"small"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    name="amount"
                    className="p-[6px] py-2 border-[1.5px] w-full border-gray-300 rounded-[5px] text-sm"
                    placeholder="Enter the Amount"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Date
                  </label>
                  <input
                    size={"small"}
                    type="date"
                    className="p-[6px] border-[1.5px] w-full py-2 border-gray-300 rounded-[5px] text-sm"
                    placeholder="Enter the Amount"
                    value={date}
                    name="transactionDate"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    size={"small"}
                    type="text"
                    className="p-[6px] border-[1.5px] w-full lg:min-w-[350px] md:min-w-[250px] py-2 border-gray-300 rounded-[5px] text-sm"
                    placeholder="Enter the Notes"
                    value={notes}
                    name="notes"
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <hr className="my-2" />

            <div className="my-4 px-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTransaction;
