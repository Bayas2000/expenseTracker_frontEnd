import React from "react";
import GroupChart from "./GroupChart";
import SummaryCardsGrid from "./SummaryCards/SummaryCardsGrid";
import CreateMember from "./CreateMember";
import AddTransaction from "./AddTransaction";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  ListGroupRecords,
  ListGroupsDetails,
  ListInvestmentDetails,
} from "../../Store/Groups/groupsList";
import ListTransaction from "./ListTransaction/ListTransaction";
import ListMembers from "./ListMembers";
import { useLocation } from "react-router-dom";

const GroupViewDetails = ({}) => {
  const groupData = useSelector((state) => state.groups?.groups_list);
  const recordsDetails = useSelector((state) => state.groups?.records_list);
  const investDetails = useSelector((state) => state.groups?.investment_list);

  const location = useLocation();
  const group = location.state?.group;
  const groupId = group?._id || "";

  const groupDetails = groupData.filter((data) => data._id === groupId);

  console.log("recordsDetails", recordsDetails[0]?.summaryCarts);
  

  const [showCreateEmployee, setShowCreateEmployee] = React.useState(false);
  const [showAddTransaction, setShowAddTransaction] = React.useState(false);
  const [content, setContent] = React.useState("groupMembers");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(ListGroupsDetails());
    dispatch(ListInvestmentDetails(groupId));
    dispatch(ListGroupRecords(groupId));
  }, []);

  const GroupInvestment =
    investDetails && investDetails.length > 0
      ? investDetails.filter((data) => data.groupId == groupId)
      : [];

  const handleClick = (data) => {
    setContent(data);
  };

  return (
    <div className="px-6 pt-6 pb-2">
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
            {groupDetails[0]?.groupName} Overview
          </h1>
        </div>
      </div>
      <div className="flex items-center mt-8 gap-8">
        <div className="w-[100%]">
          <SummaryCardsGrid recordsDetails={recordsDetails[0]?.summaryCarts} groupDetails={groupDetails} />
        </div>
      </div>

      <div className="flex justify-center items-center mt-10 space-x-0">
        <button
          onClick={() => {
            handleClick("groupMembers");
            dispatch(ListGroupsDetails());
          }}
          className={`transition-all duration-300 ease-in-out px-10 py-2 font-semibold border text-white 
      ${
        content === "groupMembers"
          ? "bg-blue-600 border-blue-700"
          : "bg-blue-300 hover:bg-blue-400 border-blue-400"
      } 
      rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Group Members
        </button>

        <button
          onClick={() => {
            dispatch(ListInvestmentDetails());
            handleClick("groupTransaction");
          }}
          className={`transition-all duration-300 ease-in-out px-10 py-2 font-semibold border text-white 
      ${
        content === "groupTransaction"
          ? "bg-blue-600 border-blue-700"
          : "bg-blue-300 hover:bg-blue-400 border-blue-400"
      } 
      rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Group Transaction
        </button>
      </div>

      {content === "groupMembers" &&
        groupDetails[0]?.groupDetails?.length > 0 && (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Group Members
              </h2>
              <button
                onClick={() => {
                  setShowCreateEmployee(true);
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
            <ListMembers groupDetails={groupDetails} />
          </div>
        )}

      {content === "groupTransaction" && (
        <div className="my-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Group Transaction
            </h2>
            <button
              onClick={() => {
                setShowAddTransaction(true);
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
          <ListTransaction
            GroupInvestment={GroupInvestment}
            groupId={groupId}
          />
        </div>
      )}

      {showCreateEmployee && (
        <CreateMember
          showModal={showCreateEmployee}
          setShowModal={setShowCreateEmployee}
          groupId={groupId}
        />
      )}
      {showAddTransaction && (
        <AddTransaction
          groupDetails={groupDetails[0]?.groupDetails}
          showModal={showAddTransaction}
          setShowModal={setShowAddTransaction}
          groupId={groupId}
        />
      )}
    </div>
  );
};

export default GroupViewDetails;
