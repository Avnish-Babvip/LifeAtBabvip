import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const assetRoute = `${
    import.meta.env.VITE_PRODUCTION === "true"
      ? import.meta.env.VITE_ASSETS
      : ""
  }`;

  const dispatch = useDispatch();

  const { response, isUserLoggedIn } = useSelector(
    (state) => state.authentication
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { headMenuData } = useSelector((state) => state.headMenu);
  const { siteSetting } = useSelector(
    (state) => state.siteSettings.siteSettingsData
  );

  // Function to close offcanvas menu on link click
  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById("offcanvasWithBackdrop");
    if (offcanvasElement) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown2, setActiveDropdown2] = useState(null);

  // useEffect(() => {
  //   const dropdowns = document.querySelectorAll(".nav-item.dropdown");

  //   dropdowns.forEach((dropdown) => {
  //     dropdown.addEventListener("mouseenter", function () {
  //       let dropdownMenu = this.querySelector(".dropdown-menu");
  //       dropdownMenu.classList.add("show");
  //       dropdownMenu.style.display = "block";
  //     });

  //     dropdown.addEventListener("mouseleave", function () {
  //       let dropdownMenu = this.querySelector(".dropdown-menu");
  //       dropdownMenu.classList.remove("show");
  //       dropdownMenu.style.display = "none";
  //     });
  //   });
  // }, []);

  return (
    // <header class="main-header position-absolute w-100 z-10">
    <header class="main-header  w-100 z-10">
      <nav class="navbar navbar-expand-xl navbar-light sticky-header">
        <div class="container d-flex align-items-center justify-content-lg-between position-relative">
          <Link
            to={"/"}
            class="navbar-brand d-flex align-items-center mb-md-0 text-decoration-none"
          >
            {siteSetting?.setting_data?.site_logo && (
              <img
                src={`${import.meta.env.VITE_REACT_APP_IMAGE_PATH}/${
                  siteSetting?.setting_data?.site_logo
                }`}
                alt={siteSetting?.setting_data?.site_logo_alt}
                class="img-fluid"
              />
            )}
          </Link>
          <div className="d-block d-lg-none pe-2">
            <Link
              class="btn btn-success btn-sm"
              to={"/find/jobs"}
              role="button "
              aria-expanded="false"
            >
              See All Jobs
            </Link>
          </div>

          {/* Hamburger */}
          <div
            class="navbar-toggler position-absolute right-0 border-0"
            role="button"
          >
            <i
              class="flaticon-menu"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBackdrop"
              aria-controls="offcanvasWithBackdrop"
            ></i>
          </div>
          <div class="clearfix"></div>
          <div class="collapse navbar-collapse justify-content-center">
            <ul class="nav col-12 col-md-auto justify-content-center main-menu">
              {Array.isArray(headMenuData) &&
                headMenuData?.length > 0 &&
                headMenuData?.map((item, idx) =>
                  item?.is_horizontal &&
                  item?.children_recursive?.length > 0 ? (
                    <li
                      key={idx}
                      className="nav-item dropdown"
                      onMouseEnter={() => setActiveDropdown(idx)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        className="nav-link dropdown-toggle"
                        to={
                          item?.menu_slug ||
                          item?.pages?.page_data?.page_slug ||
                          "#"
                        }
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item?.title}
                      </Link>
                      <div
                        className={`dropdown-menu border-0 rounded-custom shadow py-0 homepage-list-wrapper ${
                          activeDropdown === idx ? "show" : ""
                        }`}
                      >
                        <div className="dropdown-grid rounded-custom homepage-dropdown">
                          <div style={{ width: "810px" }}>
                            <div className="row g-0">
                              {item?.children_recursive?.map((item2, idx2) => (
                                <Link
                                  to={
                                    item2?.menu_slug ||
                                    item2?.pages?.page_data?.page_slug ||
                                    "#"
                                  }
                                  key={idx2}
                                  className="col-md-4"
                                  onClick={() => setActiveDropdown(null)} // Close dropdown when clicked
                                >
                                  <div
                                    className="card h-100 border-0 rounded-3 zoom-card"
                                    style={{
                                      width: "270px",
                                      cursor: "pointer",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <div className="card-body">
                                      <div className="mb-3">
                                        <img
                                          src={
                                            item2?.menu_image
                                              ? `${
                                                  import.meta.env
                                                    .VITE_REACT_APP_IMAGE_PATH
                                                }/${item2?.menu_image}`
                                              : `${assetRoute}/placeholder.webp`
                                          }
                                          alt={item2?.title}
                                          width={220}
                                          height={150}
                                          className="rounded-3 zoom-image"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="card-title d-flex fs-6 gap-2">
                                          {item2?.title} <span>›</span>
                                        </h5>
                                        <p className="card-text text-muted small truncate-2 font-weight-semibold text-capitalize">
                                          {item2?.menu_description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : !item?.is_horizontal &&
                    item?.children_recursive?.length > 0 ? (
                    <li
                      key={idx}
                      class="nav-item dropdown"
                      onMouseEnter={() => setActiveDropdown2(idx)}
                      onMouseLeave={() => setActiveDropdown2(null)}
                    >
                      <Link
                        class="nav-link dropdown-toggle  "
                        onClick={() => setActiveDropdown2(null)}
                        to={
                          item?.menu_slug ||
                          item?.pages?.page_data?.page_slug ||
                          "#"
                        }
                        // data-bs-toggle="dropdown"
                      >
                        {item?.title}
                      </Link>
                      <div
                        class={`dropdown-menu border-0 rounded-custom shadow py-0  homepage-list-wrapper ${
                          activeDropdown2 === idx ? "show" : ""
                        }`}
                      >
                        <div class="dropdown-grid rounded-custom  homepage-dropdown">
                          {/* Custom Logo Mega Header Layout  */}
                          <div className="" style={{ width: "900px" }}>
                            <div className="row g-0">
                              {item?.children_recursive?.map((item2, idx2) => (
                                <Link
                                  to={
                                    item2?.menu_slug ||
                                    item2?.pages?.page_data?.page_slug ||
                                    "#"
                                  }
                                  key={idx2}
                                  className="col-md-6 "
                                  onClick={() => setActiveDropdown2(null)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <div
                                    className="card h-100 border-0 rounded-4 dropdownCardHover "
                                    style={{ width: "450px" }}
                                  >
                                    <div className="card-body d-flex align-items-center gap-3  ">
                                      {" "}
                                      {/* Reduced padding */}
                                      <div className="">
                                        <img
                                          src={
                                            item2?.menu_image
                                              ? `${
                                                  import.meta.env
                                                    .VITE_REACT_APP_IMAGE_PATH
                                                }/${item2?.menu_image}`
                                              : `${assetRoute}/placeholder.webp`
                                          }
                                          alt="Free tier illustration"
                                          width={70}
                                          height={70}
                                          className="rounded-3"
                                        />
                                      </div>
                                      <div>
                                        <h5
                                          className="card-title d-flex gap-2 fs-6  custom-hover-color"
                                          style={{ color: "#175cff" }}
                                        >
                                          {item2?.title}
                                          <span>›</span>
                                        </h5>
                                        {item2.menu_description && (
                                          <p className="card-text truncate-2 text-muted text-capitalize small font-weight-semibold">
                                            {item2.menu_description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li key={idx}>
                      <Link
                        to={
                          item?.menu_slug ||
                          item?.pages?.page_data?.page_slug ||
                          "#"
                        }
                        class="nav-link"
                      >
                        {item?.title}
                      </Link>
                    </li>
                  )
                )}

              {/* <li class="action-btns text-end me-5 me-lg-0 d-none d-md-block d-lg-block">
                        <a href="javascript:void(0)" class="btn btn-link p-1 tt-theme-toggle">
                        <div class="tt-theme-light" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Light"><i class="flaticon-sun-1 fs-lg"></i></div>
                        <div class="tt-theme-dark" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Dark"><i class="flaticon-moon-1 fs-lg"></i></div>
                        </a> 
                        </li> */}
            </ul>
          </div>

          <div className="d-none d-xl-flex align-items-center gap-6">
            <Link
              class="btn btn-success"
              to={"/find/jobs"}
              role="button"
              aria-expanded="false"
            >
              See All Jobs
            </Link>

            {!isUserLoggedIn && (
              <Link
                class="btn btn-success"
                to={"https://lifeatbabvip.com/applicant/login"}
                role="button"
                aria-expanded="false"
              >
                Login
              </Link>
            )}
            {isUserLoggedIn && (
              <div className="position-relative d-none d-xl-block pe-4">
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="d-flex align-items-center gap-2 fw-semibold text-black text-capitalize">
                    <svg
                      className="height-5 width-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg>{" "}
                    {response?.applicant?.name}
                    <svg
                      className="height-5 width-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                    </svg>
                  </div>
                </div>

                {dropdownOpen && (
                  <div
                    className="dropdown-menu show mt-2 p-2 shadow rounded-3"
                    style={{
                      right: 0,
                      left: "auto",
                      minWidth: "160px",
                      position: "absolute",
                    }}
                  >
                    <a
                      href="https://www.lifeatbabvip.com/applicant/dashboard"
                      className="dropdown-item"
                    >
                      Go To Dashboard
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* //mobile screen */}

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasWithBackdrop"
      >
        <div class="offcanvas-header d-flex align-items-center mt-4">
          <Link
            to={"/"}
            class="d-flex align-items-center mb-md-0 text-decoration-none"
          >
            {siteSetting?.setting_data?.site_logo && (
              <img
                src={`${import.meta.env.VITE_REACT_APP_IMAGE_PATH}/${
                  siteSetting?.setting_data?.site_logo
                }`}
                alt={siteSetting?.setting_data?.site_logo_alt}
                class="img-fluid ps-2"
              />
            )}
          </Link>
          <button
            type="button"
            class="close-btn text-danger"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i class="flaticon-cancel"></i>
          </button>
        </div>

        <div class="offcanvas-body">
          <ul class="nav col-12 col-md-auto justify-content-center main-menu">
            {Array.isArray(headMenuData) &&
              headMenuData?.length > 0 &&
              headMenuData?.map((item, idx) =>
                item?.children_recursive?.length > 0 ? (
                  <li key={idx} class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle"
                      to={
                        item?.menu_slug ||
                        item?.pages?.page_data?.page_slug ||
                        "#"
                      }
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item?.title}
                    </Link>
                    <div class="dropdown-menu border-0 rounded-custom shadow py-0 bg-white homepage-list-wrapper">
                      <div class="dropdown-grid rounded-custom width-full homepage-dropdown">
                        <div class="dropdown-grid-item bg-white radius-left-side">
                          {item?.children_recursive?.map((item2, idx2) => (
                            <Link
                              to={
                                item2?.menu_slug ||
                                item2?.pages?.page_data?.page_slug ||
                                "#"
                              }
                              onClick={closeOffcanvas} // Close offcanvas on click
                              key={idx2}
                              class="dropdown-link"
                            >
                              <img
                                src={
                                  item2?.menu_image
                                    ? `${
                                        import.meta.env
                                          .VITE_REACT_APP_IMAGE_PATH
                                      }/${item2?.menu_image}`
                                    : `${assetRoute}/placeholder.webp`
                                }
                                alt={item2?.title}
                                class="demo-list rounded"
                              />

                              <div class="dropdown-info">
                                <div class="drop-title text-capitalize">
                                  {item2?.title}
                                </div>
                                <p className="text-capitalize truncate-1">
                                  {item2?.menu_description}{" "}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={idx}>
                    <Link
                      to={
                        item?.menu_slug ||
                        item?.pages?.page_data?.page_slug ||
                        "#"
                      }
                      class=" nav-link text-capitalize"
                      onClick={closeOffcanvas} // Close offcanvas on click
                    >
                      {item?.title}
                    </Link>
                  </li>
                )
              )}
          </ul>
        </div>
        {!isUserLoggedIn && (
          <div class="w-full d-flex justify-content-end pb-4 pe-4">
            {" "}
            <Link
              class="btn btn-success"
              to={"https://lifeatbabvip.com/applicant/login"}
              role="button"
              aria-expanded="false"
            >
              Login
            </Link>
          </div>
        )}

        {isUserLoggedIn && (
          <div
            className="position-absolute bottom-0 end-0 p-4 d-xl-none"
            style={{ zIndex: 1055 }} // Ensure it stays above base content
          >
            <div className="nav-item dropdown">
              <div
                className="d-flex align-items-center nav-link dropdown-toggle gap-4"
                style={{ cursor: "pointer" }}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <img
                  src={
                    customer?.profile_image
                      ? `${
                          import.meta.env.VITE_REACT_APP_IMAGE_PATH
                        }/customer-profile/${customer?.profile_image}`
                      : `${assetRoute}/placeholder.webp`
                  }
                  height={40}
                  width={40}
                  className="rounded-circle"
                  alt="Profile"
                /> */}
                <span className="d-flex align-items-center gap-2 fw-semibold text-black text-capitalize">
                  <svg
                    className="height-5 width-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                  </svg>
                  {response?.applicant?.name}
                </span>
              </div>

              <div
                className="dropdown-menu border-0 rounded-custom shadow py-0 bg-white homepage-list-wrapper show-on-click"
                style={{
                  width: "300px", // Increased width for the dropdown box
                  minWidth: "300px", // Set a fixed min-width to avoid shrinkage
                }}
              >
                <div className="dropdown-grid rounded-custom ">
                  <div className="dropdown-grid-item bg-white radius-left-side">
                    <a
                      href="https://www.lifeatbabvip.com/applicant/dashboard"
                      onClick={closeOffcanvas}
                      className="dropdown-link d-flex align-items-center gap-2"
                    >
                      <img
                        src={`${assetRoute}/placeholder.webp`}
                        className="demo-list rounded"
                        alt="Customer"
                      />
                      <div className="dropdown-info">
                        <div className="drop-title text-capitalize">
                          Dashboard
                        </div>
                        <p className="truncate-1">Go to Dashboard</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
