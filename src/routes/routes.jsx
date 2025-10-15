// -----------------------------------------------Imports---------------------------------------------
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import Maintenance from "../pages/Maintenance";
import DynamicRootPage from "../pages/DynamicRootPage";
import Loader from "../components/Loader/Loader";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Authentication/Login";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import SignUp from "../pages/Authentication/SignUp";
import MyProfile from "../pages/Dashboard/MyProfile";
import ChangePassword from "../pages/Authentication/ChangePassword";
import EmailVerification from "../pages/Authentication/EmailVerification";
import FeedbackForm from "../pages/FeedbackForm";


// Lazy Loading 😴
const Blog = lazy(() => import("../pages/Blog"));
const Career = lazy(() => import("../pages/Career"));
const FindJobs = lazy(() => import("../pages/FindJobs"));
const HelpCenter = lazy(() => import("../pages/HelpCenter"));
const Portfolio = lazy(() => import("../pages/Portfolio"));

// import Blog from "../pages/Blog";
// import HelpCenter from "../pages/HelpCenter";
// import Portfolio from "../components/Home/Portfolio/Portfolio";

// ---------------------------------------------------------------------------------------------------
console.log("enter inside the routes page");
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <DynamicRootPage />,
      },
      {
        path: "/feedback/form",
        element: <FeedbackForm />,
      },
      {
        path: "/:slug",
        element: <DynamicRootPage />,
      },
      {
        path: "/blog/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/job/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <Career />
          </Suspense>
        ),
      },
      {
        path: "/find/jobs",
        element: (
          <Suspense fallback={<Loader />}>
            <FindJobs />
          </Suspense>
        ),
      },
      {
        path: "/help/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <HelpCenter />
          </Suspense>
        ),
      },
      {
        path: "/portfolio/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: "/applicant/dashboard", // 👈 separate dashboard routes
        element: <Dashboard />,
      },
      {
        path: "/applicant/profile", // 👈 separate dashboard routes
        element: <MyProfile />,
      },
      {
        path: "/applicant/changePassword", // 👈 separate dashboard routes
        element: <ChangePassword />,
      },
      {
        path: "/login/applicant", // 👈 separate dashboard routes
        element: <Login />,
      },
      {
        path: "/email-verification/applicant", // 👈 separate dashboard routes
        element: <EmailVerification />,
      },
      {
        path: "/login/password-reset",
        element: <ForgotPassword />,
      },
      {
        path: "/signup/applicant",
        element: <SignUp />,
      },
    ],
  },
]);

export const maintenanceAppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Maintenance />,
  },
]);
