import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData, updateApplicantProfile } from '../../features/actions/authentication';

const PersonalInformation = ({ goToNextTab }) => {
  const { profileData,applicantData } = useSelector((state) => state.authentication);
  const dispatch = useDispatch()
  console.log(applicantData)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: profileData.personal_information?.first_name,
      middle_name: profileData.personal_information?.middle_name,
      last_name:  profileData.personal_information?.last_name,
      email:  profileData.personal_information?.email,
      phone:  profileData.personal_information?.phone,
      gender:  profileData.personal_information?.gender,
      date_of_birth:  profileData.personal_information?.date_of_birth,
      house_no:  profileData.personal_information?.house_no,
      landmark:  profileData.personal_information?.landmark,
      area:  profileData.personal_information?.area,
      current_address:  profileData.personal_information?.current_address,
      permanent_address:  profileData.personal_information?.permanent_address,
      city:  profileData.personal_information?.city,
      state:  profileData.personal_information?.state,
      zip:  profileData.personal_information?.zip,
      country:  profileData.personal_information?.country
    }
  });

  const onSubmit = (data) => {
     const [year, month, day] = data.date_of_birth.split("-");
  const formattedDate = `${day}-${month}-${year}`;
    dispatch(updateApplicantProfile({payload:{...data,date_of_birth:formattedDate},step:"1",loginToken:applicantData?.login_token})).then(()=>{
      dispatch(getProfileData(applicantData?.login_token))
    });
  };

  


  return (

      <Form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded bg-white shadow-sm mb-4">
              <h5 className="mb-4 border-bottom pb-2 ">Personal Information</h5>


        <div className="row">
          <Form.Group className="mb-3 col-md-4">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              {...register('first_name', { required: 'First name is required' })}
            />
            {errors.first_name && <small className="text-danger">{errors.first_name.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3 col-md-4">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control {...register('middle_name')} />
          </Form.Group>

          <Form.Group className="mb-3 col-md-4">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              {...register('last_name', { required: 'Last name is required' })}
            />
            {errors.last_name && <small className="text-danger">{errors.last_name.message}</small>}
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              {...register('phone', {
                required: 'Phone number is required',
                minLength: { value: 10, message: 'Must be at least 10 digits' }
              })}
            />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Gender</Form.Label>
            <Form.Select {...register('gender', { required: 'Please select gender' })}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
            {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" {...register('date_of_birth', { required: 'Date of birth is required' })} />
            {errors.date_of_birth && <small className="text-danger">{errors.date_of_birth.message}</small>}
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6">
            <Form.Label>House No.</Form.Label>
            <Form.Control {...register('house_no')} />
          </Form.Group>

          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Landmark</Form.Label>
            <Form.Control {...register('landmark')} />
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Area</Form.Label>
            <Form.Control {...register('area')} />
          </Form.Group>

          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Current Address</Form.Label>
            <Form.Control {...register('current_address')} />
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Permanent Address</Form.Label>
            <Form.Control {...register('permanent_address')} />
          </Form.Group>

          <Form.Group className="mb-3 col-md-6">
            <Form.Label>City</Form.Label>
            <Form.Control {...register('city')} />
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6">
            <Form.Label>State</Form.Label>
            <Form.Control {...register('state')} />
          </Form.Group>

          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Zip</Form.Label>
            <Form.Control {...register('zip')} />
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6">
            <Form.Label>Country</Form.Label>
            <Form.Control {...register('country')} />
          </Form.Group>
        </div>
        
           <div className="d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type='button' className="btn btn-danger" onClick={()=>goToNextTab()}>Next</button>
      </div>
      </Form>

  );
};

export default PersonalInformation;
