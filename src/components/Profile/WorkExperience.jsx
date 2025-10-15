import { Button, Form } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, updateApplicantProfile } from "../../features/actions/authentication";


const WorkExperience = ({ goToPreviousTab, goToNextTab }) => {
  const { profileData,applicantData } = useSelector((state) => state.authentication);
  const dispatch = useDispatch()

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      work_experience: profileData?.work_experience
        ? profileData.work_experience // assume it's already an array
        : [
            {
              designation: "",
              employment_type: "",
              company_name: "",
              current_working: 0,
              start_month: "",
              start_year: "",
              end_month: "",
              end_year: "",
              location: "",
              salary_ctc: "",
              skills: [],
              position: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experience",
  });

const onSubmit = (data) => {
  const formData = new FormData();

  data.work_experience.forEach((exp, index) => {
    Object.keys(exp).forEach((field) => {
      if (field === "skills") {
        // ensure skills is always an array
        let skills = Array.isArray(exp.skills)
          ? exp.skills
          : exp.skills.split(",").map((s) => s.trim());

        skills.forEach((skill, skillIndex) => {
          formData.append(`work_experiences[${index}][skills][${skillIndex}]`, skill);
        });
      } else {
        formData.append(
          `work_experiences[${index}][${field}]`,
          field === "current_working" ? (exp[field] ? "1" : "0") : exp[field]
        );
      }
    });
  });

  // add step as requested
  formData.append("step", "3");


  for (let [key, value] of formData.entries()) {
    console.log(key, ":", value);
  }


    dispatch(updateApplicantProfile({
      payload: formData,
      loginToken: applicantData?.login_token
    })).then(()=>{
      dispatch(getProfileData(applicantData?.login_token))
    });
};


  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 rounded bg-white shadow-sm mb-4"
    >
      <h5 className="mb-4 border-bottom pb-2">Work Experience</h5>

      {fields.map((item, index) => (
        <div key={item.id} className="border rounded p-3 mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6>Experience {index + 1}</h6>
            {fields.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>

          {/* Designation */}
          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control {...register(`work_experience.${index}.designation`)} />
          </Form.Group>

          {/* Position */}
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control {...register(`work_experience.${index}.position`)} />
          </Form.Group>

          {/* Employment Type */}
          <Form.Group className="mb-3">
            <Form.Label>Employment Type</Form.Label>
            <Form.Select {...register(`work_experience.${index}.employment_type`)}>
              <option value="">Select Type</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Full Time">Full Time</option>
            </Form.Select>
          </Form.Group>

          {/* Company Name */}
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control {...register(`work_experience.${index}.company_name`)} />
          </Form.Group>

          {/* Current Working */}
         <Form.Group className="mb-3">
  <Form.Check
    type="checkbox"
    label="Currently Working Here"
    value="1"                           // submit 1 when checked
    {...register(`work_experience.${index}.current_working`)}
  />
</Form.Group>


          {/* Start Date */}
          <Form.Group className="mb-3 d-flex gap-2">
            <div className="flex-fill">
              <Form.Label>Start Month</Form.Label>
              <Form.Control
                {...register(`work_experience.${index}.start_month`)}
                placeholder="MM"
              />
            </div>
            <div className="flex-fill">
              <Form.Label>Start Year</Form.Label>
              <Form.Control
                {...register(`work_experience.${index}.start_year`)}
                placeholder="YYYY"
              />
            </div>
          </Form.Group>

          {/* End Date */}
          <Form.Group className="mb-3 d-flex gap-2">
            <div className="flex-fill">
              <Form.Label>End Month</Form.Label>
              <Form.Control
                {...register(`work_experience.${index}.end_month`)}
                placeholder="MM"
              />
            </div>
            <div className="flex-fill">
              <Form.Label>End Year</Form.Label>
              <Form.Control
                {...register(`work_experience.${index}.end_year`)}
                placeholder="YYYY"
              />
            </div>
          </Form.Group>

          {/* Location */}
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control {...register(`work_experience.${index}.location`)} />
          </Form.Group>

          {/* Salary */}
          <Form.Group className="mb-3">
            <Form.Label>Salary (CTC in LPA)</Form.Label>
            <Form.Control
              type="number"
              {...register(`work_experience.${index}.salary_ctc`)}
            />
          </Form.Group>

          {/* Skills */}
          <Form.Group className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              {...register(`work_experience.${index}.skills`)}
              placeholder="Comma-separated (e.g., PHP, React)"
            />
          </Form.Group>
        </div>
      ))}

      <Button
        variant="outline-primary"
        className="mb-3"
        onClick={() =>
          append({
            designation: "",
            employment_type: "",
            company_name: "",
            current_working: 0,
            start_month: "",
            start_year: "",
            end_month: "",
            end_year: "",
            location: "",
            salary_ctc: "",
            skills: [],
            position: "",
          })
        }
      >
        + Add More
      </Button>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => goToPreviousTab()}
        >
          Previous
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => goToNextTab()}
        >
          Next
        </button>
      </div>
    </Form>
  );
};

export default WorkExperience;
