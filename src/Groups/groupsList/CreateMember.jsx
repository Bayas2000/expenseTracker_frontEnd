import React from "react";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { ListGroupsDetails } from "../../Store/Groups/groupsList";
import { toast } from "react-toastify";

const CreateMember = ({ showModal, setShowModal, groupId }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = React.useState("");
  const [members, setMembers] = React.useState([]);
  const [initialAmount, setInitialAmount] = React.useState("");

  const handleCreateGroup = () => {
    if (!members) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      groupId: groupId,
      memberIds: members.split(","),
    };

    api
      .post("/groupMember/inviteMembers", payload)
      .then((res) => {
        dispatch(ListGroupsDetails());
        toast.success("Invitations have been sent to the selected members.");
        setShowModal(false);
        setGroupName("");
        setInitialAmount("");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add New Member</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Connection IDs
                </label>
                <p className="text-xs text-gray-500 mb-1">
                  Enter comma-separated connection IDs (e.g.{" "}
                  <code>id1,id2,id3</code>).
                  <br />
                  You can find the Connection ID on the user's profile.
                </p>
                <input
                  type="text"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="e.g. id1,id2,id3"
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

export default CreateMember;
