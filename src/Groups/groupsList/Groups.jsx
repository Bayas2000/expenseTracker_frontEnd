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
import createGroup from "../../assets/groups.png";

function Groups() {
  const state = useSelector((state) => state.groups.groups_list);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);

  React.useEffect(() => {
    dispatch(ListGroupsDetails());
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Team Spaces</h1>
          <p className="text-sm text-gray-500">
            Manage and collaborate within your groups seamlessly.
          </p>
        </div>
        {state.length > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition"
          >
            + Create New
          </button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {state.length > 0 &&
          state.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {group.groupName}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Members:{" "}
                <span className="font-medium text-gray-700">
                  {group?.groupDetails.length}
                </span>
              </p>

              <p className="text-base font-semibold text-emerald-600 mb-2">
                Balance: ₹{group.groupBalance.toLocaleString()}
              </p>

              <p className="text-xs text-gray-400 mb-4">
                Created: {moment(group.createdAt).format("DD-MM-YY")}
              </p>

              {/* <Link
                onClick={() => {
                  dispatch(ListGroupDetailsView(group));
                }}
                to={"/business/groups/groupsView"}
                state={{
                  groupId: group.id,
                }}
              >
                <button
                  onClick={() => {
                    setShowViewDetails(true);
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </Link> */}
              <Link
                onClick={() => {
                  dispatch(ListGroupDetailsView(group));
                }}
                to="/business/groups/groupsView"
                state={{ group: group }}
                className="w-full block bg-gray-900 hover:bg-gray-800 text-white text-sm py-2 rounded-lg text-center transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
      </div>
      {state.length === 0 && (
        <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4 ">
          <img
            src={createGroup}
            alt="Create Group Illustration"
            className="max-w-[150px] mb-2 drop-shadow-sm rounded-full "
          />

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            No Groups Created Yet
          </h2>

          <p className="text-gray-500 text-base mb-6 max-w-md">
            Get started by creating your first group to organize your team and
            manage shared expenses efficiently.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            + Create Your First Group
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <CreateGroup showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default Groups;
