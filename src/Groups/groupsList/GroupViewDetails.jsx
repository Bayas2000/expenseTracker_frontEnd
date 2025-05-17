import React from "react";
import { useSelector } from "react-redux";
import GroupChart from "./GroupChart";
import SummaryCardsGrid from "./SummaryCardsGrid";
import CreateMember from "./CreateMember";

const GroupViewDetails = () => {
  const groupDetails = useSelector((state) => state.groups?.group_view_list);
  
  console.log(groupDetails, "groupDetails");

  const [showCreateEmployee, setShowCreateEmployee] = React.useState(false);

  return (
    <div className="px-6">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-all  cursor-pointer"
            onClick={() => window.history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
            <span className="text-sm font-semibold">Back</span>
          </button>
          <h1 className=" text-2xl font-semibold">
            {groupDetails?.groupName} Overview
          </h1>
        </div>
        <button
          onClick={() => {
            setShowCreateEmployee(true);
            console.log("button clicked");
          }}
          className=" bg-blue-400 p-2 rounded-lg text-sm text-white flex items-center shadow-md "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          Add Members
        </button>
      </div>
      <div className="flex items-center mt-8 gap-8">
        <div className="w-[40%]">
          <SummaryCardsGrid />
        </div>
        <div className="w-[60%] ">
          <GroupChart />
        </div>
      </div>
      {groupDetails?.groupDetails?.length > 0 && (
        <div className="mt-10">
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Group Members</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Monthly Target</th>
                    <th className="px-6 py-3">Invite Status</th>
                    <th className="px-6 py-3">Joined On</th>
                  </tr>
                </thead>
                <tbody>
                  {groupDetails?.groupDetails?.map((member, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {member.memberName}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{member.role}</td>
                      <td className="px-6 py-4 text-gray-700">
                        ${member.monthlyTarget.toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-4 ${
                          member.inviteStatus === "Accepted"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {member.inviteStatus}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showCreateEmployee && (
        <CreateMember
          showModal={showCreateEmployee}
          setShowModal={setShowCreateEmployee}
          groupId={groupDetails?._id}
        />
      )}
    </div>
  );
};

export default GroupViewDetails;
