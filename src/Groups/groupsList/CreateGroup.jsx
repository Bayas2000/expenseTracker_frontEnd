import React from "react";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { ListGroupsDetails } from "../../Store/Groups/groupsList";

const CreateGroup = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = React.useState("");
  const [initialAmount, setInitialAmount] = React.useState("");

  const handleCreateGroup = () => {
    if (!groupName || !initialAmount) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      groupName: groupName,
      monthlyTarget: initialAmount,
    };

    api
      .post("/group/create", payload)
      .then((res) => {
        dispatch(ListGroupsDetails());
        toast.success("Group created successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });

    console.log("Group Created:", { groupName, initialAmount });
    setShowModal(false);
    setGroupName("");
    setInitialAmount("");
  };
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-100 bg-black/50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Create New Group</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Target
                </label>
                <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter monthly Target"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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
      )}
    </div>
  );
};

export default CreateGroup;
