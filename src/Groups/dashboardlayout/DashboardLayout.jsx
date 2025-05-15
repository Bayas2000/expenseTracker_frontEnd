import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import GroupHeader from "./GroupHeader";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 ">
        <GroupHeader />
        <div className="p-6 bg-white min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
