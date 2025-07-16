import React from "react";
import Banner from "./Banner";
import Expenses from "./Expenses";
import Income from "./Income";
import ExpenseModal from "./ExpenseModal";
import AddIcon from "../assets/addIcon.png";
import useIsLargeScreen from "./hooks/useLargeScreen";
import { useSelector } from "react-redux";
import MonthlyExpenseOverview from "./monthlyExpense/MonthlyExpenseOverview";

const Content = () => {
  const dateFilter = useSelector((state) => state.banner?.date_Filter);

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("expense");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dateFilter]);

  const isLargeScreen = useIsLargeScreen();

  return (
    <div className={`relative`}>
     
      <div className="">
        <Banner />
      </div>
    
      {loading == true ? (
        <div className="flex justify-center items-center w-full h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid" />
        </div>
      ) : (
        <div className=" flex gap-x-2 lg:flex-row md:flex-row sm:flex-row  flex-col ml-2">
          <Expenses
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
            setActiveTab={setActiveTab}
          />
          <Income
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {/* <div
        className=" lg:w-[77%] flex justify-center fixed top-75  right-20 lg:ml-[5%] mt-[14%]"
        onClick={() => setOpenAddModal(!openAddModal)}
      >
        <img className="w-15 sticky top-0 " src={AddIcon} alt="Add Icon" />
      </div> */}
      <div
        className="fixed lg:bottom-6 md:bottom-20 sm:bottom-22 bottom-25    right-6 z-50 cursor-pointer"
        onClick={() => {
          setOpenAddModal(!openAddModal);
          setActiveTab("expense");
        }}
      >
        <img
          className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 "
          src={AddIcon}
          alt="Add Icon"
        />
      </div>
      {openAddModal && (
        <div className="position-fixed  top-15 left-[16%] absolute ">
          <ExpenseModal
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
    </div>
  );
};

export default Content;
