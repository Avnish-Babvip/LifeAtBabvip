import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobLocations, getPaginateJobs } from "../features/actions/career";
import { Link } from "react-router-dom";
import { checkApplicantLogin } from "../features/actions/authentication";

const FindJobs = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [locationId, setLocationId] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState(title);

  const [url, setUrl] = useState(
    `${
      import.meta.env.VITE_REACT_APP_API_BASE_URL_PRODUCTION
    }/site/alljobs?page=1`
  );
  const { jobData, jobLocations } = useSelector((state) => state.career);

  const isFirstRender = useRef(true); // Track first render

  const { response, userEmail, isUserLoggedIn } = useSelector(
    (state) => state.authentication
  );
  const storedEmail = localStorage.getItem("user_email");

  const handleApply = async (e, item) => {
    e.preventDefault();
    // First, check login
    if (userEmail) {
      dispatch(checkApplicantLogin(userEmail));
    } else {
      dispatch(checkApplicantLogin(storedEmail));
    }

    if (!isUserLoggedIn) {
      window.location.href = "https://www.lifeatbabvip.com/applicant/login";
    }

    const applicantId = response?.applicant?.id;
    if (!applicantId) return;
    console.log(response);

    const form = document.createElement("form");
    form.method = "GET";
    form.action = "https://www.lifeatbabvip.com/job/job-application-store";

    const applicantIdInput = document.createElement("input");
    applicantIdInput.type = "hidden";
    applicantIdInput.name = "applicant_id";
    applicantIdInput.value = applicantId;
    form.appendChild(applicantIdInput);

    const jobIdInput = document.createElement("input");
    jobIdInput.type = "hidden";
    jobIdInput.name = "job_id";
    jobIdInput.value = item.id;
    form.appendChild(jobIdInput);

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500); // Adjust delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [title]);

  useEffect(() => {
    dispatch(
      getPaginateJobs({
        url: url,
        payload: {
          title: debouncedTitle,
          locationId: locationId,
          type: type,
        },
      })
    );

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      window.scrollTo(0, 0);
    }
  }, [url, type, locationId, debouncedTitle]);

  useEffect(() => {
    dispatch(getJobLocations());
  }, []);

  return (
    <>
      <div class="container ">
        <h1
          class="text-center mt-4"
          style={{ "font-size": "60px", color: "blue" }}
        >
          Find your dream job
        </h1>
      </div>

      <section id="open-positions" class="open-jobs ptb-120">
        <div class="container">
          <div class="row align-items-center justify-content-between"></div>

          <form
            id="job-search-form"
            method="GET"
            action="https://lifeatbabvip.com/filter/jobs"
          >
            <div class="row justify-content-between">
              <div class="col-md-4">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job Title"
                  value={title}
                  style={{
                    "border-color": "blue",
                    "box-shadow": "0 0 0 0.25rem rgba(0, 123, 255, 0.25)",
                  }}
                />
              </div>

              <div class="col-md-4">
                <select
                  name="location_id"
                  id="location_id"
                  class="form-select"
                  onChange={(e) => setLocationId(e.target.value)}
                  style={{
                    "border-color": "blue",
                    "box-shadow": "0 0 0 0.25rem rgba(0, 123, 255, 0.25)",
                  }}
                >
                  <option value="">Select Location</option>
                  {Array.isArray(jobLocations) &&
                    jobLocations.map((item, idx) => (
                      <option value={item?.id}>{item?.location_name}</option>
                    ))}
                </select>
              </div>

              <div class="col-md-4">
                <select
                  name="type"
                  id="type"
                  onChange={(e) => setType(e.target.value)}
                  class="form-select"
                  style={{
                    "border-color": "blue",
                    "box-shadow": "0 0 0 0.25rem rgba(0, 123, 255, 0.25)",
                  }}
                >
                  <option value="">Select Job Type</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
            </div>
          </form>

          <div class="row ">
            {Array.isArray(jobData?.data) && jobData?.data.length > 0 ? (
              jobData?.data?.map((item, idx) => (
                <div class="col-lg-6 col-md-12">
                  <Link
                    to={`/job/${item?.job_slug}`}
                    class={`text-decoration-none mt-4  single-open-job p-5 bg-dark text-white d-block rounded-custom`}
                  >
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="job-time h-6 mb-2">
                        <i class="fas fa-briefcase me-2"></i>{" "}
                        <strong className="text-capitalize">
                          {item?.type.replace(/-/g, " ")}
                        </strong>
                      </span>
                      <span class="badge px-3 py-2 bg-custom-light rounded-pill small">
                        {item?.department?.Department_name}
                      </span>
                    </div>
                    <h3 class="h5 text-capitalize">{item?.title}</h3>
                    <ul class="job-info-list list-inline list-unstyled text-muted">
                      <li class="list-inline-item">
                        <span class="fas fa-house me-1"></span>{" "}
                        {item?.company?.company_name}
                      </li>
                      <li class="list-inline-item">
                        <span class="fas fa-location-pin me-1"></span>{" "}
                        {item?.location?.location_name}
                      </li>
                      <li class="list-inline-item">
                        <span class="fas fa-wallet me-1"></span>{" "}
                        {item?.minimum_salary && item?.maximum_salary
                          ? `${item?.minimum_salary} - ${item?.maximum_salary} LPA`
                          : !item?.minimum_salary && item?.maximum_salary
                          ? `${item?.maximum_salary} LPA`
                          : item?.minimum_salary && !item?.maximum_salary
                          ? `${item?.minimum_salary} LPA`
                          : "NA"}
                      </li>
                    </ul>
                    <div
                      onClick={(e) => handleApply(e, item)}
                      class="btn btn-outline-light btn-sm d-inline-block mt-4"
                    >
                      Apply Now
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center py-5">No Result Found</p>
            )}
          </div>
        </div>

        <div class="row justify-content-center align-items-center mt-5">
          <div class="col-auto my-1">
            {Array.isArray(jobData?.links) && (
              <div
                onClick={() =>
                  jobData?.links[0]?.url && setUrl(jobData?.links[0]?.url)
                }
                class={`btn btn-soft-primary btn-sm ${
                  jobData?.links[0]?.url && "active"
                }`}
              >
                {jobData?.links[0]?.label?.replace("&laquo;", "")}
              </div>
            )}
          </div>
          <div class="col-auto my-1">
            <nav>
              <ul class="pagination rounded mb-0">
                {Array.isArray(jobData?.links) &&
                  jobData?.links?.slice(1, -1).map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => setUrl(item?.url)}
                      class={`page-item ${url === item?.url && "active"} `}
                    >
                      <div class="page-link">{item?.label}</div>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
          <div class="col-auto my-1">
            {Array.isArray(jobData?.links) && (
              <div
                onClick={() =>
                  jobData?.links?.at(-1)?.url &&
                  setUrl(jobData?.links?.at(-1)?.url)
                }
                class={`btn btn-soft-primary btn-sm ${
                  jobData?.links?.at(-1)?.url && "active"
                }`}
              >
                {jobData?.links?.at(-1)?.label?.replace("&raquo;", "")}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FindJobs;
