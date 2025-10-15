// ----------------------------------Imports--------------------------------------
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import DashboardDefaultLayout from "./DashboardDefaultLayout";

// --------------------------------------------------------------------------------

const DefaultLayout = () => {
  const { pathname } = useLocation(); // Get the current route
  const isApplicantSlugRoute = pathname.startsWith("/applicant/");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]); // Runs when route changes

  return (
    <ErrorBoundary>
      {" "}
      {isApplicantSlugRoute ? (
        <DashboardDefaultLayout />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </ErrorBoundary>
  );
};

export default DefaultLayout;
