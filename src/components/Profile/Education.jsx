import { Accordion, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, updateApplicantProfile } from "../../features/actions/authentication";

const Education = ({ goToPreviousTab,goToNextTab }) => {
   const { profileData,applicantData } = useSelector((state) => state.authentication);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      highest_education: profileData.education_information?.highest_education || "",
      tenth_passout_year: profileData.education_information?.tenth_passout_year || "",
      tenth_school: profileData.education_information?.tenth_school || "",
      tenth_board_name: profileData.education_information?.tenth_board_name || "",
      tenth_percentage: profileData.education_information?.tenth_percentage || "",
      twelfth_passout_year: profileData.education_information?.twelfth_passout_year || "",
      twelfth_school: profileData.education_information?.twelfth_school || "",
      twelfth_board_name: profileData.education_information?.twelfth_board_name || "",
      twelfth_percentage: profileData.education_information?.twelfth_percentage || "",
      twelfth_stream: profileData.education_information?.twelfth_stream || "",
      diploma_name: profileData.education_information?.diploma_name || "",
      diploma_specialization: profileData.education_information?.diploma_specialization || "",
      diploma_percentage: profileData.education_information?.diploma_percentage || "",
      diploma_institution: profileData.education_information?.diploma_institution || "",
      diploma_passout_year: profileData.education_information?.diploma_passout_year || "",
      degree_level: profileData.education_information?.degree_level || "",
      degree_specialization: profileData.education_information?.degree_specialization || "",
      degree_percentage: profileData.education_information?.degree_percentage || "",
      degree_institution: profileData.education_information?.degree_institution || "",
      degree_passout_year: profileData.education_information?.degree_passout_year || "",
      masters_specialization: profileData.education_information?.masters_specialization || "",
      masters_percentage: profileData.education_information?.masters_percentage || "",
      masters_institution: profileData.education_information?.masters_institution || "",
      masters_passout_year: profileData.education_information?.masters_passout_year || "",
      skills_relevant: profileData.education_information?.skills_relevant || "",
    },
  });

  const onSubmit = (data) => {
   dispatch(updateApplicantProfile({payload:data,step:"2",loginToken:applicantData?.login_token})).then(()=>{
      dispatch(getProfileData(applicantData?.login_token))
    });
  };


  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 rounded bg-white shadow-sm mb-4"
    >
      <h5 className="border-bottom pb-2 mb-4">Education Section</h5>

      <Accordion defaultActiveKey="0">
        {/* 10th Section */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>10th or Equivalent Information</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Passout Year</Form.Label>
              <Form.Control {...register("tenth_passout_year")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>School</Form.Label>
              <Form.Control {...register("tenth_school")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Board Name</Form.Label>
              <Form.Control {...register("tenth_board_name")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control {...register("tenth_percentage")} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>

        {/* 12th Section */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>12th or Equivalent Information</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Passout Year</Form.Label>
              <Form.Control {...register("twelfth_passout_year")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>School</Form.Label>
              <Form.Control {...register("twelfth_school")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Board Name</Form.Label>
              <Form.Control {...register("twelfth_board_name")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control {...register("twelfth_percentage")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stream</Form.Label>
              <Form.Control {...register("twelfth_stream")} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>

        {/* Graduation / Diploma */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Graduation / Diploma</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Degree Level</Form.Label>
              <Form.Control {...register("degree_level")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control {...register("degree_specialization")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control {...register("degree_percentage")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Institution</Form.Label>
              <Form.Control {...register("degree_institution")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Passout Year</Form.Label>
              <Form.Control {...register("degree_passout_year")} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>

        {/* Post Graduation */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Post Graduation (Optional)</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control {...register("masters_specialization")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control {...register("masters_percentage")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Institution</Form.Label>
              <Form.Control {...register("masters_institution")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Passout Year</Form.Label>
              <Form.Control {...register("masters_passout_year")} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="d-flex justify-content-end mt-4 gap-2">
           <button type="button" className="btn btn-danger" onClick={()=>goToPreviousTab()}>Previous</button>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-danger" onClick={()=>goToNextTab()}>Next</button>
      </div>
    </Form>
  );
};

export default Education;
