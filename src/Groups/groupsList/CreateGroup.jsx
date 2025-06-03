import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ListGroupsDetails } from "../../Store/Groups/groupsList";
import api from "../../api/api";
import Select from "react-select";
import { toast } from "react-toastify";

const CreateGroup = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const [groupName, setGroupName] = useState("");
  const [monthlyTarget, setMonthlyTarget] = useState("");
  const [existingInvestment, setExistingInvestment] = useState(false);
  const [investmentType, setInvestmentType] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [investAmount, setInvestAmount] = useState("");
  const [investDate, setInvestDate] = useState(null);
  const [notes, setNotes] = useState("");

  React.useEffect(() => {
    if (!showModal) {
      setGroupName("");
      setMonthlyTarget("");
      setExistingInvestment(false);
      setInvestmentType(null);
      setQuantity("");
      setInvestAmount("");
      setInvestDate(null);
      setNotes("");
    }
  }, [showModal]);

  const investmentOptions = [
    { value: "Gold", label: "Gold" },
    { value: "Crypto", label: "Crypto" },
    { value: "Other", label: "Other" },
    { value: "Stock", label: "Stock" },
  ];

  const handleCreateGroup = () => {
    if (!groupName || !monthlyTarget) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      groupName,
      monthlyTarget,
      existInvest: existingInvestment,
      existingInvestment: [
        {
          investmentType: investmentType?.value || "",
          quantity,
          investAmount: Number(investAmount),
          investDate,
          notes,
        },
      ],
    };

    api
      .post("/group/create", payload)
      .then((res) => {
        dispatch(ListGroupsDetails());
        toast.success("Group created successfully");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });

    setShowModal(false);
    setGroupName("");
    setMonthlyTarget("");
    setExistingInvestment(false);
    setInvestmentType(null);
    setQuantity("");
    setInvestAmount("");
    setInvestDate(null);
    setNotes("");
  };

  return (
    showModal && (
      <div className="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-semibold px-6 py-3">Create Group</h2>
          <hr className="pb-3" />

          <div className="space-y-2 px-6">
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Monthly Target
                </label>
                <input
                  type="number"
                  value={monthlyTarget}
                  onChange={(e) => setMonthlyTarget(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Enter monthly target"
                />
              </div>
            </div>

            <label className="flex items-start space-x-2 max-w-md">
              <input
                type="checkbox"
                checked={existingInvestment}
                onChange={() => setExistingInvestment(!existingInvestment)}
                className="mt-2"
              />
              <div>
                <span className="text-sm font-medium">
                  This group has an existing investment
                </span>
                <p className="text-xs text-gray-500">
                  Check this to provide past investment details like type,
                  amount, and date.
                </p>
              </div>
            </label>

            {/* {existingInvestment && ( */}
            <div
              className={`transition-all duration-300 ${
                existingInvestment
                  ? "opacity-100 max-h-[1000px]"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-600 my-4">
                Existing Investment Details
              </h3>

              <div className="grid grid-cols-2  gap-4">
                <div className="">
                  <label className="block text-sm font-medium mb-1">
                    Investment Type
                  </label>
                  <Select
                    value={investmentType}
                    onChange={setInvestmentType}
                    options={investmentOptions}
                    isDisabled={!existingInvestment}
                    className="react-select-container text-sm"
                    classNamePrefix="react-select"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled={!existingInvestment}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="e.g. 2 grams"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Invest Amount
                  </label>
                  <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    disabled={!existingInvestment}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="e.g. ₹16100"
                  />
                </div>

                <div className="">
                  <label className="block text-sm font-medium mb-1">
                    Invest Date
                  </label>
                  <input
                    type="date"
                    value={investDate || ""}
                    onChange={(e) => setInvestDate(e.target.value)}
                    disabled={!existingInvestment}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Add any notes..."
                />
              </div>
            </div>
            {/* )} */}
          </div>

          <hr className="mt-4" />
          <div className="flex justify-end gap-2 p-4 px-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateGroup}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateGroup;
