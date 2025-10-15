  import { Form } from 'react-bootstrap';
  import { useForm } from 'react-hook-form';
  import { useDispatch, useSelector } from 'react-redux';
  import { getProfileData, updateApplicantProfile } from '../../features/actions/authentication';

  const OtherInformation = ({ goToPreviousTab }) => {
    const { profileData ,applicantData} = useSelector((state) => state.authentication);
    const dispatch = useDispatch()

    // Build defaultValues object dynamically from faqs
    const defaultValues = {};
    profileData?.faqs?.forEach((faq) => {
      defaultValues[faq.question_id] = faq?.answer;
    });
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues,
    });

const onSubmit = (data) => {
  // Convert flat data into array structure
  const responses = Object.entries(data).map(([question_id, answer]) => ({
    question_id,
    answer,
  }));

  const payload = { responses };

  dispatch(updateApplicantProfile({
    payload,
    step: "5",
    loginToken: applicantData?.login_token
  })).then(() => {
    dispatch(getProfileData(applicantData?.login_token));
  });
};

    return (
      <Form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded bg-white shadow-sm mb-4">
        <h5 className="mb-4 border-bottom pb-2">Other Information</h5>

        {profileData?.faqs?.map((faq,idx) => (
          <Form.Group key={idx} className="mb-3">
            <Form.Label className="fw-semibold">{faq.question}</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                value="yes"
                {...register(faq.question_id, { required: true })}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                value="no"
                {...register(faq.question_id, { required: true })}
              />
              {errors[faq.question_id] && (
                <div className="text-danger small">Please select Yes or No</div>
              )}
            </div>
          </Form.Group>
        ))}

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-danger" onClick={()=>goToPreviousTab()}>Previous</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </Form>
    );
  };

  export default OtherInformation;
