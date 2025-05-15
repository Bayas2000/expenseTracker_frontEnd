import { Routes, Route } from "react-router-dom";
import GroupDashboard from "./pages/GroupDashboard";
import DashboardLayout from "../dashboardlayout/DashboardLayout";
import Groups from "../groupsList/Groups";
import GroupViewDetails from "../groupsList/GroupViewDetails";
import NotificationPage from "../dashboardlayout/NotificationPage";

const GroupRoutes = () => (
  <Routes>
    <Route path="/business" element={<DashboardLayout />}>
      <Route path="dashboard" element={<GroupDashboard />} />
      <Route path="groups" element={<Groups />} />
      <Route path="groupsView" element={<GroupViewDetails />} />
      <Route path="notifications" element={<NotificationPage />} />
    </Route>
  </Routes>
);

export default GroupRoutes;
