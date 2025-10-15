import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { applicantLogout, getProfilePhotoData } from "../../features/actions/authentication";

const DashboardHeader = ({ onHamburgerClick }) => {
  const assetRoute = `${
    import.meta.env.VITE_PRODUCTION === "true"
      ? import.meta.env.VITE_ASSETS
      : ""
  }`;

  const dispatch = useDispatch();
  // const { customer } = useSelector((state) => state.dashboard.profileData);
  const { applicantData,profilePhotoData } = useSelector((state) => state.authentication);
  const { applicant } = useSelector(
    (state) => state.authentication.applicantData
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   useEffect(()=>{
  dispatch(getProfilePhotoData(applicantData?.login_token))
  },[])

  return (
    <header className="w-100 z-10 p-3 pe-4 bg-white">
      <div className="d-flex justify-content-between align-items-center">
        {/* Hamburger icon only on small screens */}
        <button
          className="border-0 bg-white d-md-none"
          onClick={onHamburgerClick}
        >
          <img
            src={`${assetRoute}/assets/img/dashboardIcons/menu.png`}
            alt="Menu"
            style={{ width: "28px", height: "28px" }}
          />
        </button>

        <div
          className="d-flex align-items-center gap-4 ms-auto"
          ref={dropdownRef}
        >
          <img
            src={`${assetRoute}/assets/img/dashboardIcons/bell_icon.svg`}
            className="img-fluid"
            alt="Notifications"
            style={{ height: "18px", width: "24px", cursor: "pointer" }}
          />

          {/* Profile with dropdown */}
          <div className="position-relative ">
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={
                  profilePhotoData?.image_url
                    ? profilePhotoData?.image_url
                    :
                  `${assetRoute}/placeholder.webp`
                }
                height={40}
                width={40}
                className="rounded-circle"
                alt="Profile"
              />
              <span className="fw-semibold text-black">{applicant?.first_name} {applicant?.last_name}</span>
            </div>

            {dropdownOpen && (
              <div
                className="dropdown-menu show mt-2  p-2 shadow rounded-3"
                style={{
                  right: "0",
                  left: "auto",
                  top: "100%",
                  position: "absolute",
                  zIndex: 1050,
                  minWidth: "160px",
                  maxWidth: "calc(100vw - 20px)",
                  overflowX: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <Link to="/" className="dropdown-item fw-500">
                  Back to Main Site
                </Link>
                <Link to="/applicant/profile" className="dropdown-item fw-500">
                  My Profile
                </Link>
                <Link
                  to="/applicant/changePassword"
                  className="dropdown-item fw-500"
                >
                  Change Password
                </Link>
                <Link
                  onClick={() => {
                    dispatch(applicantLogout(applicantData?.login_token));
                  }}
                  className="dropdown-item text-danger fw-500"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
