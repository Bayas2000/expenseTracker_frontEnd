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
              key={group._id}
              className="flex flex-col justify-between bg-white rounded-2xl border shadow-sm p-5 w-full max-w-sm"
            >
              {/* Top Info */}
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {group.groupName}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      📅 Created on:{" "}
                      {moment(group.createdAt).format("DD MMM YYYY")}
                    </p>
                  </div>
                  <span className="text-green-700 bg-green-100 text-xs font-semibold px-2 py-1 rounded-full">
                    {group.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-800 mb-3">
                  <p className="flex items-center gap-1 col-span-1">
                    🧑‍🤝‍🧑 <span>Members:</span>{" "}
                    <strong>{group.groupDetails?.length || 0}</strong>
                  </p>
                  <p className="flex items-center gap-1 col-span-1">
                    💰 <span>Balance:</span>{" "}
                    <strong className="text-emerald-600">
                      ₹{group.groupBalance.toLocaleString()}
                    </strong>
                  </p>
                  <p className="flex items-center gap-1 col-span-1">
                    🎯 <span>Monthly Target:</span>{" "}
                    <strong>₹{group.monthlyTarget.toLocaleString()}</strong>
                  </p>
                  <p className="flex items-center gap-1 col-span-1">
                    🧾 <span>Existing Amount:</span>{" "}
                    <strong>₹{group.existTotalAmount.toLocaleString()}</strong>
                  </p>
                </div>

                {/* Conditional Investment */}
                {group.existInvest && group.existingInvestment?.length > 0 && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-gray-700 space-y-1 mb-4">
                    <p>
                      📦 Investment:{" "}
                      <strong>
                        {group.existingInvestment[0]?.investmentType}
                      </strong>
                    </p>
                    <p>
                      💸 ₹
                      {group.existingInvestment[0]?.investAmount.toLocaleString()}{" "}
                      on{" "}
                      {moment(group.existingInvestment[0]?.investDate).format(
                        "DD MMM YYYY"
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Button pinned at bottom */}
              <Link
                to="/business/groups/groupsView"
                onClick={() => dispatch(ListGroupDetailsView(group))}
                state={{ group }}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg text-center"
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
