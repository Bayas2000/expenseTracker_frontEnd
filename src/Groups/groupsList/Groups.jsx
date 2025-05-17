import React, { useState } from "react";
import CreateGroup from "./CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  ListGroupDetailsView,
  ListGroupsDetails,
} from "../../Store/Groups/groupsList";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import GroupViewDetails from "./GroupViewDetails";

const dummyGroups = [
  {
    id: 1,
    name: "Marketing Team",
    members: 5,
    balance: 12500,
    createdAt: "2024-10-12",
  },
  {
    id: 2,
    name: "Product Development",
    members: 8,
    balance: 30200,
    createdAt: "2024-12-03",
  },
  {
    id: 3,
    name: "Investor Circle",
    members: 3,
    balance: 15500,
    createdAt: "2025-02-17",
  },
];

function Groups() {
  const state = useSelector((state) => state.groups.groups_list);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState(dummyGroups);
  const [showModal, setShowModal] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);

  React.useEffect(() => {
    dispatch(ListGroupsDetails());
  }, []);

  console.log(state, "state");

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Groups</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Create Group
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {state.length > 0 &&
          state.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {group.groupName}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Members:{" "}
                <span className="font-medium text-gray-700">
                  {group?.groupDetails.length}
                </span>
              </p>

              {/* Balance */}
              <p className="text-base font-semibold text-emerald-600 mb-2">
                Balance: ₹{group.groupBalance.toLocaleString()}
              </p>

              {/* Date */}
              <p className="text-xs text-gray-400 mb-4">
                Created: {moment(group.createdAt).format("DD-MM-YY")}
              </p>

              {/* Button */}
              <Link
                onClick={() => {
                  dispatch(ListGroupDetailsView(group));
                }}
                to={"/business/groups/groupsView"}
              >
                <button
                  onClick={() => setShowViewDetails(true)}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </Link>
            </div>
          ))}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateGroup showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default Groups;
