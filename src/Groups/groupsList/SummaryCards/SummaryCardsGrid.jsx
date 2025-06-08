import React from "react";
import { FaRegEdit } from "react-icons/fa";
import TargetUpdateModal from "./TargetUpdateModal";

const SummaryCard = ({ title, value, card, showModal, setShowModal }) => {
  console.log(title, value, "records values");
  console.log(card, "card values");

  return (
    <div
      className="rounded-xl p-5 shadow-sm w-full"
      style={{
        backgroundColor:
          title === "Balance"
            ? "#FDF5ED"
            : title === "Target Amount"
            ? "#EAF4EC"
            : title === "Collected Amount"
            ? "#E7EFFA"
            : "#EDF4F1",
      }}
    >
      <p className="text-gray-600 text-sm mb-1">{title}</p>
      <p className="text-xl font-bold text-gray-800">₹{value}</p>
      {/* <p className="text-xs text-green-600 mt-1">{change} than last month</p> */}
      {title === "Target Amount" && (
        <button
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 mt-1"
          onClick={() => setShowModal(true)}
        >
          <FaRegEdit className="w-3 h-3" />
          Update Target Amount
        </button>
      )}
    </div>
  );
};

const SummaryCardsGrid = ({ recordsDetails, groupDetails }) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recordsDetails.map((card, index) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            card={card}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        ))}
      </div>

      <TargetUpdateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        groupDetails={groupDetails}
      />
    </>
  );
};

export default SummaryCardsGrid;
