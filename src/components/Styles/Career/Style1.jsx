import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLatestSixJobs } from "../../../features/actions/career";
import { checkApplicantLogin } from "../../../features/actions/authentication";

const Style1 = ({ data }) => {
  const dispatch = useDispatch();
  const { latestJobData } = useSelector((state) => state.career);
  const { response, userEmail, isUserLoggedIn } = useSelector(
    (state) => state.authentication
  );
  const storedEmail = localStorage.getItem("user_email");

  useEffect(() => {
    dispatch(getLatestSixJobs());
  }, []);

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

    // Then, get CSRF token
    // try {
    //   const response2 = await instance.get("/site/csrf-token", {
    //     headers: headers,
    //   });
    //   const token = response2.data.csrf_token;

    // Now, create and submit the form
    // if (response2 && response2.data && response2.data.csrf_token) {
    const applicantId = response?.applicant?.id;
    if (!applicantId) return;

    const form = document.createElement("form");
    form.method = "GET";
    form.action = "https://www.lifeatbabvip.com/job/job-application-store";

    // const csrf = document.createElement("input");
    // csrf.type = "hidden";
    // csrf.name = "_token";
    // csrf.value = token;
    // form.appendChild(csrf);

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
    // }
    // } catch (error) {
    //   console.error("CSRF or Login Error", error);
    // }
  };

  return (
    <>
      <section id="open-positions" class="open-jobs ptb-120">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div class="col-lg-4 col-md-12">
              <div class="section-heading">
                <h4 class="h5 text-primary">{data?.subtitle}</h4>
                <h2>{data?.title}</h2>
              </div>
            </div>
            <div class="col-lg-7 col-md-12">
              <p>{data?.description} </p>
            </div>
          </div>
          <div class="row ">
            {Array.isArray(latestJobData) &&
              latestJobData?.map((item, idx) => (
                <div class="col-lg-6 col-md-12">
                  <Link
                    to={`/job/${item?.job_slug}`}
                    class={`text-decoration-none mt-4 ${
                      idx < 2 && "mt-xl-0 mt-lg-0"
                    } single-open-job p-5 bg-dark text-white d-block rounded-custom`}
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
                    <button
                      onClick={(e) => handleApply(e, item)}
                      className="btn btn-outline-light btn-sm d-inline-block mt-4"
                    >
                      Apply Now
                    </button>
                  </Link>
                </div>
              ))}
          </div>
          <div className="d-flex justify-content-center pt-5">
            <Link to={"/find/jobs"} class="btn btn-primary btn-lg w-25">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Style1;
