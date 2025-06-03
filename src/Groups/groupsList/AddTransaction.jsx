import React, { useState } from "react";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { ListInvestmentDetails } from "../../Store/Groups/groupsList";
import { toast } from "react-toastify";
import Select from "react-select";

const AddTransaction = ({ groupDetails, showModal, setShowModal, groupId }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = React.useState("");
  const [members, setMembers] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [notes, setNotes] = React.useState("");

  const membersOption =
    groupDetails && groupDetails.length > 0
      ? groupDetails.map((data) => {
          return {
            value: data._id,
            label: data.memberName,
          };
        })
      : [];

  const [transactionsArray, setTransactionArray] = useState([
    {
      members: "",
      amount: "",
      transactionDate: null,
      notes: "",
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setTransactionArray((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const AddNewArray = () => {
    setTransactionArray((prev) => [
      ...prev,
      {
        members: "",
        amount: "",
        transactionDate: null,
        notes: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    setTransactionArray((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTransaction = () => {
    if (!members) {
      alert("Please fill in all fields");
      return;
    }

    const payload = transactionsArray.map((transaction) => ({
      groupId: groupId,
      memberId: transaction.members,
      amount: Number(transaction.amount),
      notes: transaction.notes,
      investmentDate: transaction.transactionDate,
    }));

    api
      .post("/investment/create-many", payload)
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
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl   relative">
            <h2 className="text-xl font-semibold my-2 px-6">
              Add New Transaction
            </h2>
            <hr className="my-2" />
            <div className="hidden md:flex justify-end items-center px-6 my-4">
              <button
                onClick={AddNewArray}
                className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 flex items-center text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" />
                </svg>
                Add New
              </button>
            </div>
            <div className="max-h-[400px] min-h-[250px] overflow-y-auto px-6 w-full">
              {transactionsArray
                ? transactionsArray.map((data, index) => (
                    <div className=" grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-3 w-full ">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          select Member
                        </label>
                        <Select
                          size={"small"}
                          options={membersOption}
                          value={membersOption.find(
                            (opt) => opt.value === data.members
                          )}
                          onChange={(selectedOption) => {
                            const selectedValue = selectedOption.value;
                            setTransactionArray((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? { ...item, members: selectedValue }
                                  : item
                              )
                            );
                          }}
                          name="member"
                          className="text-sm"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <input
                          size={"small"}
                          value={data.amount}
                          onChange={(e) => handleChange(index, e)}
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
                          value={data.transactionDate}
                          name="transactionDate"
                          onChange={(e) => handleChange(index, e)}
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
                          value={data.notes}
                          name="notes"
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                      <div className="hidden md:flex justify-end items-start w-full">
                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                          aria-label="Remove transaction"
                          title="Remove"
                          className=" mt-6 rounded-full p-2 bg-red-100 hover:bg-red-200 transition duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 -960 960 960"
                            width="20"
                            fill="#EA3323"
                          >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                : []}
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
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
