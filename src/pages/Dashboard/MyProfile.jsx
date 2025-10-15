import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PersonalInformation from "../../components/Profile/PersonalInformation";
import Documents from "../../components/Profile/Documents";
import Education from "../../components/Profile/Education";
import WorkExperience from "../../components/Profile/WorkExperience";
import OtherInformation from "../../components/Profile/OtherInformation";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, getProfilePhotoData, updateProfilePhotoDashboard } from "../../features/actions/authentication";

const MyProfile = () => {
  const dispatch = useDispatch()
  const [isUpdated,setIsUpdated] =useState()
  const assetRoute = `${
    import.meta.env.VITE_PRODUCTION === "true"
      ? import.meta.env.VITE_ASSETS
      : ""
  }`;

  const { updateResponse, isImageLoading, profilePhotoData ,applicantData} = useSelector(
    (state) => state.authentication
  );

const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const formData = new FormData();
      formData.append("passport_size_photographs", file); // Append the file to FormData

      console.log(file)

      dispatch(
        updateProfilePhotoDashboard({
          payload: formData,
          loginToken: applicantData?.login_token,
        })
      );
    }
  };
   // Get saved tab from localStorage or default to "personal"
  const [key, setKey] = useState(() => localStorage.getItem("activeTab") || "personal");

  // Save to localStorage whenever tab changes
  useEffect(() => {
    localStorage.setItem("activeTab", key);
  }, [key]);


  // Centralized function to change tab & scroll
  const changeTab = (tabKey) => {
    setKey(tabKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(()=>{
  dispatch(getProfilePhotoData(applicantData?.login_token))
  },[updateResponse])

    useEffect(() => {
    dispatch(getProfileData(applicantData?.login_token));
  }, []);

  return (
    <div className="container">
           <div className="text-center bg-light pb-4 pt-2 mx-3">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                position: "relative", // Ensure the container is relative for absolute positioning of loader
                width: "80px", // Width of the container (same as the image)
                height: "80px", // Height of the container (same as the image)
                margin: "0 auto", // Center the container
              }}
            >
              {isImageLoading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    position: "absolute", // Position the loader in the center of the container
                    top: "50%", // Vertically center
                    left: "50%", // Horizontally center
                    transform: "translate(-50%, -50%)", // Adjust for exact centering
                    width: "50px", // Width of the loader circle
                    height: "50px", // Height of the loader circle
                    backgroundColor: "gray", // Gray background
                    borderRadius: "50%", // Round the loader
                  }}
                >
                  <div
                    className="spinner-border spinner-border-sm text-white"
                    role="status"
                    style={{
                      width: "25px", // Spinner width
                      height: "25px", // Spinner height
                    }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <img
                  src={
                    profilePhotoData?.image_url
                      ? profilePhotoData?.image_url
                      : `${assetRoute}/placeholder.webp`
                  }
                  height={80}
                  width={80}
                  className="rounded-circle"
                  alt="Profile"
                />
              )}
            </div>
       
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-warning"
                style={{
                  border: "1px solid #dee2e6",
                  borderRadius: "0.5rem",
                  fontSize: "0.5 rem",
                  fontWeight: 500,
                  padding: "0.15rem 0.5rem",
                  marginTop: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => document.getElementById("fileInput").click()} // Trigger file input when button is clicked
              >
                Change Picture
              </button>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
      <Tabs
        id="profile-tabs"
        activeKey={key}
        onSelect={(k) => changeTab(k)}
        className="mb-4"
        style={{ fontWeight: "500" }}
        justify
      >
        <Tab eventKey="personal" title="Personal Information">
          <PersonalInformation goToNextTab={() => changeTab("documents")} />
        </Tab>

        <Tab eventKey="documents" title="Documents">
          <Documents goToPreviousTab={() => changeTab("personal")} goToNextTab={() => changeTab("education")} />
        </Tab>

        <Tab eventKey="education" title="Education">
          <Education goToPreviousTab={() => changeTab("documents")} goToNextTab={() => changeTab("experience")} />
        </Tab>

        <Tab eventKey="experience" title="Work Experience">
          <WorkExperience goToPreviousTab={() => changeTab("education")} goToNextTab={() => changeTab("other")} />
        </Tab>

        <Tab eventKey="other" title="Other Information">
          <OtherInformation goToPreviousTab={() => changeTab("documents")} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MyProfile;
