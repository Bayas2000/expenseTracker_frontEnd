import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import "../index.css";
import SignUp from "./Signup";
import OptionModal from "./OptionsModal";
import Dashboard from "../Groups/dashboard/dashboard";
import GroupDashboard from "../Groups/groupDashboard/GroupDashboard";
import DashboardLayout from "../Groups/dashboardlayout/DashboardLayout";
import Groups from "../Groups/groupsList/Groups";
import GroupViewDetails from "../Groups/groupsList/GroupViewDetails";
import NotificationPage from "../Groups/dashboardlayout/NotificationPage";
import InvestmateIntro from "../Groups/dashboard/InvestmateIntro";

const body = () => {
  // const appRouter = createBrowserRouter([
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/",
  //     element: <Dashboard />,
  //   },
  //   {
  //     path: "/register",
  //     element: <SignUp />,
  //   },
  //   {
  //     path: "/options",
  //     element: <OptionModal />,
  //   },

  //   {
  //     path: "/ForPersonHome",
  //     element: <Main />,
  //   },
  //   {
  //     path: "/DashboardLayout",
  //     element: <DashboardLayout />,
  //   },

  // ]);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/options",
      element: <OptionModal />,
    },
    {
      path: "/investmateIntro",
      element: <InvestmateIntro />,
    },

    // 👤 Personal Section
    {
      path: "/ForPersonal",
      element: <Main />,
    },

    // 🏢 Business Section
    {
      path: "/business",
      element: <DashboardLayout />, // has sidebar, outlet, etc.
      children: [
        {
          path: "dashboard", // full path: /business/dashboard
          element: <GroupDashboard />,
        },
        {
          path: "groups",
          element: <Groups />,
        },
        {
          path: "groups/groupsView",
          element: <GroupViewDetails />,
        },

        {
          path: "notifications",
          element: <NotificationPage />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default body;
