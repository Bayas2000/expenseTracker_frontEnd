import moment from "moment";
import React from "react";

const ListMembers = ({groupDetails}) => {

  console.log("groupDetails in list", groupDetails);
  
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Joined On</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {groupDetails[0]?.groupDetails.map((member, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {member.memberName}
              </td>
              <td className="px-6 py-4 text-gray-700">{member.role}</td>

              <td className={`px-6 py-4 font-medium`}>{member.memberAmount}</td>
              <td className="px-6 py-4 text-gray-500">
                {member.joinedDate
                  ? moment(member.joinedDate).format("DD-MM-YYYY")
                  : moment(member.createdAt).format("DD-MM-YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMembers;
