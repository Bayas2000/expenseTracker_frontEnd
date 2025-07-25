import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy loaded components
const Login = lazy(() => import("./Login"));
const SignUp = lazy(() => import("./Signup"));
const OptionModal = lazy(() => import("./OptionsModal"));
const Dashboard = lazy(() => import("../Groups/dashboard/dashboard"));
const GroupDashboard = lazy(() => import("../Groups/groupDashboard/GroupDashboard"));
const DashboardLayout = lazy(() => import("../Groups/dashboardlayout/DashboardLayout"));
const Groups = lazy(() => import("../Groups/groupsList/Groups"));
const GroupViewDetails = lazy(() => import("../Groups/groupsList/GroupViewDetails"));
const NotificationPage = lazy(() => import("../Groups/dashboardlayout/NotificationPage"));
const InvestmateIntro = lazy(() => import("../Groups/dashboard/InvestmateIntro"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const Main = lazy(() => import("./Main")); // Personal dashboard
const MainProfile = lazy(() => import('../layout/MainProfile'))
const MainSettings = lazy(() => import('../layout/MainSetting'))

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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/profile",
    element: <MainProfile />,
  },
  {
    path: "/setting",
    element: <MainSettings />,
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
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
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

const ShimmerFallback = () => {
  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-[#1a1a1a] flex flex-col">
      <header className="w-full h-20 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="h-6 w-36 bg-gray-700 rounded-md animate-pulse mb-6" />

        <div className="h-8 w-3/4 max-w-xl bg-gray-600 rounded-md animate-pulse mb-4" />
        <div className="h-6 w-2/3 max-w-md bg-gray-600 rounded-md animate-pulse mb-8" />

        <div className="flex space-x-4">
          <div className="h-10 w-40 bg-gray-700 rounded-full animate-pulse" />
          <div className="h-10 w-40 bg-gray-800 rounded-full animate-pulse" />
        </div>
      </main>
    </div>
  );
};


const Body = () => {
  return (
   <Suspense fallback={<ShimmerFallback />}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
};

export default Body;
