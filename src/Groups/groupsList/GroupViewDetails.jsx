import React from "react";
import GroupChart from "./GroupChart";
import SummaryCardsGrid from "./SummaryCardsGrid";
import CreateMember from "./CreateMember";
import AddTransaction from "./AddTransaction";
import moment from "moment/moment";
import {useDispatch , useSelector } from 'react-redux';
import {ListInvestmentDetails} from '../../Store/Groups/groupsList'

const GroupViewDetails = () => {
  const groupDetails = useSelector((state) => state.groups?.group_view_list);
  const investDetails = useSelector((state) => state.groups?.investment_list);
  
  console.log(groupDetails._id, "groupDetails");
  console.log(investDetails, "investDetails");

  const [showCreateEmployee, setShowCreateEmployee] = React.useState(false);
  const [showAddTransaction, setShowAddTransaction] = React.useState(false);
  const [content, setContent] = React.useState('groupMembers');

  const dispatch = useDispatch()

  React.useEffect(() => { 
    dispatch(ListInvestmentDetails())
  }, [])

  const GroupInvestment = investDetails && investDetails.length > 0
  ? investDetails.filter((data) => data.groupId == groupDetails._id)
  : [];

  console.log(GroupInvestment , 'GroupInvestment');
  

  const handleClick = (data) => {
    console.log(data);
    setContent(data)
  } 

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
        
      </div>
      <div className="flex items-center mt-8 gap-8">
        <div className="w-[100%]">
          <SummaryCardsGrid />
        </div>
        {/* <div className="w-[60%] ">
          <GroupChart />
        </div> */}
      </div>

     

        <div className="flex justify-center items-center mt-10 space-x-0">
  <button
    onClick={() => handleClick('groupMembers')}
    className={`transition-all duration-300 ease-in-out px-10 py-2 font-semibold border text-white 
      ${content === 'groupMembers' 
        ? 'bg-blue-600 border-blue-700' 
        : 'bg-blue-300 hover:bg-blue-400 border-blue-400'} 
      rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
  >
    Group Members
  </button>
  
  <button
    onClick={() => handleClick('groupTransaction')}
    className={`transition-all duration-300 ease-in-out px-10 py-2 font-semibold border text-white 
      ${content === 'groupTransaction' 
        ? 'bg-blue-600 border-blue-700' 
        : 'bg-blue-300 hover:bg-blue-400 border-blue-400'} 
      rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
  >
    Group Transaction
  </button>
</div>


     {content === 'groupMembers' && groupDetails?.groupDetails?.length > 0 && (
  <div className="mt-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Group Members</h2>
      <button
        onClick={() => {
          setShowCreateEmployee(true);
          console.log("button clicked");
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow flex items-center transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
          fill="currentColor"
          className="mr-2"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        Add Members
      </button>
    </div>

    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Monthly Target</th>
           <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Joined On</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {groupDetails.groupDetails.map((member, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {member.memberName}
              </td>
              <td className="px-6 py-4 text-gray-700">{member.role}</td>
              <td className="px-6 py-4 text-gray-700">
                ${member.monthlyTarget.toLocaleString()}
              </td>
              <td
                className={`px-6 py-4 font-medium ${
                  member.inviteStatus === "Accepted"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {member.inviteStatus}
              </td>
              <td className="px-6 py-4 text-gray-500">
              { member.joinedDate ? moment(member.joinedDate).format('DD-MM-YYYY') : moment(member.createdAt).format('DD-MM-YYYY')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    {content === 'groupTransaction' && (
  <div className="mt-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Group Transaction</h2>
      <button
        onClick={() => {
          setShowAddTransaction(true);
          console.log("button clicked");
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow flex items-center transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
          fill="currentColor"
          className="mr-2"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        Add Transaction
      </button>
    </div>

    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
             <th className="px-6 py-4">S.NO</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Month</th>
            <th className="px-6 py-4">Transaction Date</th>
            <th className="px-6 py-4">Notes</th>
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
          {member?.memberName || 'N/A'}
        </td>
        <td className="px-6 py-4 text-gray-700">
          ${member?.amount?.toLocaleString() ?? '0'}
        </td>
        <td className="px-6 py-4 text-gray-500">
          {moment(member.investmentDate).format('MMM')}
        </td>
        <td className="px-6 py-4 text-gray-500">
          {moment(member.investmentDate).format('DD-MM-YYYY')}
        </td>
        <td className="px-6 py-4 font-medium text-gray-800">
          {member?.notes || 'N/A'}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={4}
        className="px-6 py-6 text-center text-sm text-gray-500 "
      >
        No transactions found for this group.
      </td>
    </tr>
  )}
</tbody>

      </table>
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
      {showAddTransaction && (
        <AddTransaction
          groupDetails={groupDetails?.groupDetails}
          showModal={showAddTransaction}
          setShowModal={setShowAddTransaction}
          groupId={groupDetails?._id}
        />
      )}
    </div>
  );
};

export default GroupViewDetails;
