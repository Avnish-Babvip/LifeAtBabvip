import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsDownload } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";
import { getProfileData } from "../../features/actions/authentication";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Rejected");
  const {applicantData } = useSelector((state) => state.authentication);
const dispatch =useDispatch()

  const applications = [
    {
      location: "BANGALORE, BABVIP CREATIONS PVT. LTD.",
      status: "RE-APPLY FOR RELEVANT JOBS",
      title: "PHP Q2 25-PHP",
      icon: true,
    },
    {
      location: "PUNE, BABVIP CREATIONS PVT. LTD.",
      status: "REJECTED AT PRE-ASSESSMENT/EVALUATION",
      title: "PHP Developer-PHP",
      icon: false,
    },
  ];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const { applicant} = useSelector((state) => state.authentication.applicantData);

  // Show modal on first load
  useEffect(() => {
    setShow(true);
  }, []);
    useEffect(() => {
      dispatch(getProfileData(applicantData?.login_token));
    }, []);



  return (
    <>
      {" "}
      {/* Important Notice Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Important Notice</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Infosys offer letter and associated documents are available only on
            our career site. Candidates can access documents after logging in.
            Offer letters are no longer shared via emails with candidates.
            Validation of offer letter can be completed using this link:&nbsp;
            <a
              href="https://example.com/validate-offer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Validate Offer Letter
            </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container my-4">
        <h5 className="fw-semibold pb-3">Hello, {applicant?.first_name}</h5>
        <h4 className="fw-bold">Applications</h4>

        {/* Tabs */}
        <ul className="nav nav-tabs mt-3 mb-4">
          {["In Progress", "Applied", "Withdrawn", "Rejected", "Joined"].map(
            (tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link ${
                    activeTab === tab ? "active text-primary fw-bold" : ""
                  }`}
                  style={{ fontWeight: "500" }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            )
          )}
        </ul>

        {activeTab === "Rejected" &&
          (applications.length > 0 ? (
            <div className="row">
              {applications.map((app, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div
                    className="border rounded-4 p-3 position-relative"
                    style={{
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                      border: "1px solid #f1f1f1",
                      transition: "box-shadow 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 2px 6px rgba(0, 0, 0, 0.08)";
                    }}
                  >
                    {/* Status Badge */}
                    <span
                      className="badge bg-light border border-primary mb-2"
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#3b82f6", // Tailwind blue-500
                        letterSpacing: "0.3px",
                      }}
                    >
                      {app.status}
                    </span>

                    {/* Location */}
                    <p
                      className="text-uppercase text-primary"
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        marginBottom: "5px",
                      }}
                    >
                      {app.location}
                    </p>

                    {/* Title + Icon */}
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-0" style={{ fontSize: "18px" }}>
                        {app.title}
                      </h6>
                      {app.icon && (
                        <BsDownload
                          size={20}
                          style={{
                            color: "#9333ea",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-3 shadow-sm p-4 text-center text-muted">
              No rejected applications found
            </div>
          ))}

        {activeTab === "Withdrawn" && (
          <div
            className="border rounded-3 shadow-sm p-4 text-center text-black"
            style={{ fontWeight: "500" }}
          >
            No withdrawn applications found
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
