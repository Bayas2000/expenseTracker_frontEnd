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
    <div className="p-6">
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
              className="bg-white shadow rounded-xl p-5 border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{group.groupName}</h2>
              <p className="text-gray-600 mt-1">
                Members: {group?.groupDetails.length}
              </p>
              <p className="text-green-700 font-medium mt-2">
                Balance: ₹{group.groupBalance.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Created: {moment(group.createdAt).format("DD-MM-YY")}
              </p>
              <Link
                onClick={() => {
                  dispatch(ListGroupDetailsView(group));
                }}
                to={"/business/groupsView"}
              >
                <button
                  onClick={() => setShowViewDetails(true)}
                  className="mt-4 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm"
                >
                  View Details
                </button>
              </Link>
              {/* {showViewDetails && <GroupViewDetails />} */}
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
