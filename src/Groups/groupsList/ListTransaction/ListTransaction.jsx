import moment from "moment";
import React from "react";
import UpdateTransaction from "./UpdateTransaction";

const ListTransaction = ({ GroupInvestment, groupId }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [rows, setRows] = React.useState(false);

  const handleEdit = (member) => {
    setRows(member);
    setShowModal(true);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl max-h-[350px] overflow-auto ">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-4">S.NO</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Month</th>
            <th className="px-6 py-4">Transaction Date</th>
            <th className="px-6 py-4">Notes</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {GroupInvestment.length > 0 ? (
            GroupInvestment.map((member, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-800 ">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {member?.memberName || "N/A"}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  ₹{member?.amount?.toLocaleString() ?? "0"}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {moment(member.investmentDate).format("MMM")}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {moment(member.investmentDate).format("DD-MM-YYYY")}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {member?.notes || "N/A"}
                </td>
                <td className="px-6 flex gap-x-2 py-4 font-medium text-gray-800">
                  <button
                    onClick={() => handleEdit(member)}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#789DE5"
                    >
                      <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEdit(member)}
                    className="cursor-pointer ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#D16D6A"
                    >
                      <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-6 text-center text-sm text-gray-500 "
              >
                No transactions found for this group.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <UpdateTransaction
          setShowModal={setShowModal}
          showModal={showModal}
          groupId={groupId}
          rows={rows}
        />
      )}
    </div>
  );
};

export default ListTransaction;
