import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getProfileData, updateApplicantProfile } from '../../features/actions/authentication';

const Documents = ({ goToPreviousTab, goToNextTab }) => {
  const { profileData, applicantData } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const fileBaseURL = "https://www.lifeatbabvip.com/storage/";

  const [filesPreview, setFilesPreview] = useState({
    resume: profileData.documents[0]?.Resume
      ? `${fileBaseURL}${profileData.documents[0].Resume}`
      : null,
    aadhar_card_front: profileData.documents[0]?.aadhar_card_front
      ? `${fileBaseURL}${profileData.documents[0].aadhar_card_front}`
      : null,
    aadhar_card_back: profileData.documents[0]?.aadhar_card_back
      ? `${fileBaseURL}${profileData.documents[0].aadhar_card_back}`
      : null,
    pan_card: profileData.documents[0]?.pan_card
      ? `${fileBaseURL}${profileData.documents[0].pan_card}`
      : null,
    passport_size_photographs: profileData.documents[0]?.passport_size_photographs
      ? `${fileBaseURL}${profileData.documents[0].passport_size_photographs}`
      : null,
    passport_file: profileData.documents[0]?.passport_file
      ? `${fileBaseURL}${profileData.documents[0].passport_file}`
      : null,
  });

  const [passportTouched, setPassportTouched] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      passport:  profileData.documents[0]?.passport_file ? "Yes" : "No"
    }
  });

  const passportValue = watch("passport");


  const onSubmit = (data) => {
    const formData = new FormData();

    // Append files (if user selected new ones)
    Object.keys(filesPreview).forEach((field) => {
      if (data[field] instanceof File) {
        formData.append(field, data[field]);
      }
    });

    // Append passport only if user clicked Yes/No this session
    if (passportTouched) {
      formData.append("passport", data.passport);
      if (data.passport === "Yes" && data.passport_file instanceof File) {
        formData.append("passport_file", data.passport_file);
      }else if (data.passport === "Yes" && !(data.passport_file instanceof File)) {
       setError("passport_file", {
      type: "manual",
      message: "Please upload your passport file"
    });
      }
    }
    else{
      formData.append("passport", "No");
    }

    formData.append("step", "4");

    dispatch(updateApplicantProfile({
      payload: formData,
      loginToken: applicantData?.login_token
    })).then(()=>{
          dispatch(getProfileData(applicantData?.login_token))
        });
  };

  const handleFileChange = (fieldName, file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFilesPreview((prev) => ({
        ...prev,
        [fieldName]: fileURL,
      }));
      setValue(fieldName, file);
    }
  };

  const renderFileField = (label, fieldName, fileUrl) => (
    <div className="d-flex align-items-center justify-content-between gap-3 border p-3 rounded mb-3">
      <div>
        <div className="fw-bold">{label}</div>
        <div className="">
          {fileUrl ? (
            fileUrl.includes("pdf") ? (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
            ) : (
              <img src={fileUrl} alt={label} height={60} />
            )
          ) : (<>
            <span className="text-muted">No file uploaded</span>
            </>
          )}
        
        </div>
      </div>

      <div>
        <label className="btn btn-outline-primary mb-0">
          Choose File
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            style={{ display: "none" }}
            {...register(fieldName)}
            onChange={(e) => {
              const file = e.target.files[0];
              handleFileChange(fieldName, file);
            }}
          />
        </label>
      </div>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded bg-white shadow-sm mb-4">
      <h5 className="border-bottom pb-2 mb-4">Documents</h5>

      {renderFileField("Resume", "resume", filesPreview.resume)}
      {renderFileField("Aadhar Card (Front)", "aadhar_card_front", filesPreview.aadhar_card_front)}
      {renderFileField("Aadhar Card (Back)", "aadhar_card_back", filesPreview.aadhar_card_back)}
      {renderFileField("PAN Card", "pan_card", filesPreview.pan_card)}
      {renderFileField("Passport Size Photograph", "passport_size_photographs", filesPreview.passport_size_photographs)}

      <div className="border p-3 rounded mb-3">
        <div className="fw-bold mb-2">Passport</div>
        <Form.Check
          type="radio"
          label="Yes"
          value="Yes"
          {...register("passport", { required: "Passport selection is required" })}
          onChange={() => setPassportTouched(true)}
        />
        <Form.Check
          type="radio"
          label="No"
          value="No"
          {...register("passport", { required: "Passport selection is required" })}
          onChange={() => setPassportTouched(true)}
        />
        {errors.passport && <div className="text-danger">{errors.passport.message}.</div>}
      </div>

      {passportValue === "Yes" &&
        renderFileField("Passport File", "passport_file", filesPreview.passport_file)
      }
        {errors.passport_file && <div className='text-danger '>{errors.passport_file.message}</div> }

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-danger" onClick={() => goToPreviousTab()}>Previous</button>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-danger" onClick={() => goToNextTab()}>Next</button>
      </div>
    </Form>
  );
};

export default Documents;
