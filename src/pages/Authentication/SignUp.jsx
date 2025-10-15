import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { applicantRegister } from "../../features/actions/authentication";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { resetErrorMessage } from "../../features/slices/authentication";
import ButtonLoader from "../../components/Loader/ButtonLoader";

const SignUp = () => {
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) || "Please enter a valid email address";
  };
  const validateMobileNumber = (number) => {
    const regex = /^[1-9]\d{9}$/;
    return regex.test(number) || "Please enter a 10-digit number";
  };
  const validatePassword = (password) => {
    return (
      password.length >= 6 || "Password must be at least 6 characters long"
    );
  };
  const { errorMessage, isLoading } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

const onSubmit = (data) => {
  const formData = new FormData();

  // Append regular fields
  formData.append("first_name", data.first_name);
  formData.append("middle_name", data.middle_name || "");
  formData.append("last_name", data.last_name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("gender", data.gender || "");
  formData.append("country", data.country);
  formData.append("state", data.state);
  formData.append("city", data.city);
  formData.append("current_address", data.current_address);
  formData.append("permanent_address", data.permanent_address);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  console.log(data.resume)

  // Append files
  if (data.resume && data.resume[0]) {
    formData.append("resume", data.resume[0]);
  }

  if (data.coverLetter && data.coverLetter[0]) {
    formData.append("cover_letter", data.coverLetter[0]);
  }

  if (data.portfolio && data.portfolio[0]) {
    formData.append("portfolio", data.portfolio[0]);
  }

  //   for (let [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  // Dispatch the action with formData
  dispatch(applicantRegister(formData));

  reset();
};


  useEffect(() => {
    dispatch(resetErrorMessage());
  }, []);
  return (
    <>
      <section
        class="sign-up-in-section bg-dark ptb-60"
        style={{
          background: `url('assets/img/page-header-bg.svg') no-repeat right bottom`,
        }}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10 col-12">
              <div class="pricing-content-wrap bg-custom-light rounded-custom shadow-lg">
                <div class="price-feature-col pricing-feature-info text-white left-radius p-5 order-1 order-lg-0">
                  <a
                    href="https://www.lifeatbabvip.com"
                    class="mb-5 d-none d-xl-block d-lg-block"
                  >
                    <img
                      src="https://www.lifeatbabvip.com/site/assets/img/logo resize.png"
                      alt="logo"
                      class="img-fluid"
                    />
                  </a>

                  <div class="customer-testimonial-wrap mt-60">
                    <div class="tab-content" id="nav-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="testimonial-tab-1"
                        role="tabpanel"
                      >
                        <div class="testimonial-tab-content mb-4">
                          <div class="mb-2">
                            <ul class="review-rate mb-0 mt-2 list-unstyled list-inline">
                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>
                            </ul>
                          </div>

                          <blockquote>
                            <h5>The Best Template You Got to Have it!</h5>
                            Globally network long-term high-impact schemas
                            vis-a-vis distinctive e-commerce cross-media
                            infrastructures rather than ethical sticky
                            alignments rather than global.
                          </blockquote>

                          <div class="author-info mt-4">
                            <h6 class="mb-0">Joe Richard</h6>

                            <span>Visual Designer</span>
                          </div>
                        </div>
                      </div>

                      <div
                        class="tab-pane fade"
                        id="testimonial-tab-2"
                        role="tabpanel"
                      >
                        <div class="testimonial-tab-content mb-4">
                          <div class="mb-2">
                            <ul class="review-rate mb-0 mt-2 list-unstyled list-inline">
                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>
                            </ul>
                          </div>

                          <blockquote>
                            <h5>Amazing Quiety template!</h5>
                            Distinctively engineer client-centered information
                            and cooperative core competencies. Progressively
                            customize client-centered repurpose viral e-services
                            whereas before 24/7 total linkage.
                          </blockquote>

                          <div class="author-info mt-4">
                            <h6 class="mb-0">Oberoi R.</h6>

                            <span class="small">CEO at Herbs</span>
                          </div>
                        </div>
                      </div>

                      <div
                        class="tab-pane fade"
                        id="testimonial-tab-3"
                        role="tabpanel"
                      >
                        <div class="testimonial-tab-content mb-4">
                          <div class="mb-2">
                            <ul class="review-rate mb-0 mt-2 list-unstyled list-inline">
                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>

                              <li class="list-inline-item">
                                <i class="fas fa-star text-warning"></i>
                              </li>
                            </ul>
                          </div>

                          <blockquote>
                            <h5>Embarrassed by the First Version!</h5>
                            Efficiently whiteboard cross-unit meta-services
                            after bleeding-edge deliverables. Quickly transition
                            standardized schemas via leveraged users.
                            Assertively actualize mission-critical supply chains
                            through .
                          </blockquote>

                          <div class="author-info mt-4">
                            <h6 class="mb-0">Joan Dho</h6>

                            <span class="small">Founder and CTO</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul
                      class="nav testimonial-tab-list mt-5"
                      id="nav-tab"
                      role="tablist"
                    >
                      <li class="nav-item" role="presentation">
                        <a
                          class="active"
                          href="#testimonial-tab-1"
                          data-bs-toggle="tab"
                          data-bs-target="#testimonial-tab-1"
                          role="tab"
                          aria-selected="true"
                        >
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/testimonial/1.jpg"
                            class="img-fluid rounded-circle"
                            width="60"
                            alt="user"
                          />
                        </a>
                      </li>

                      <li class="nav-item" role="presentation">
                        <a
                          href="#testimonial-tab-2"
                          data-bs-toggle="tab"
                          data-bs-target="#testimonial-tab-2"
                          role="tab"
                          aria-selected="false"
                          tabindex="-1"
                        >
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/testimonial/2.jpg"
                            class="img-fluid rounded-circle"
                            width="60"
                            alt="user"
                          />
                        </a>
                      </li>

                      <li class="nav-item" role="presentation">
                        <a
                          href="#testimonial-tab-3"
                          data-bs-toggle="tab"
                          data-bs-target="#testimonial-tab-3"
                          role="tab"
                          aria-selected="false"
                          tabindex="-1"
                        >
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/testimonial/3.jpg"
                            class="img-fluid rounded-circle"
                            width="60"
                            alt="user"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="row justify-content-center mt-60">
                    <div class="col-12">
                      <p>Already trusted by some of the greatest companies</p>

                      <ul class="list-unstyled list-inline mb-0">
                        <li class="list-inline-item">
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/clients/client-logo-1.svg"
                            width="120"
                            alt="clients logo"
                            class="img-fluid py-3 me-3 customer-logo"
                          />
                        </li>

                        <li class="list-inline-item">
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/clients/client-logo-2.svg"
                            width="120"
                            alt="clients logo"
                            class="img-fluid py-3 me-3 customer-logo"
                          />
                        </li>

                        <li class="list-inline-item">
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/clients/client-logo-3.svg"
                            width="120"
                            alt="clients logo"
                            class="img-fluid py-3 me-3 customer-logo"
                          />
                        </li>

                        <li class="list-inline-item">
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/clients/client-logo-4.svg"
                            width="120"
                            alt="clients logo"
                            class="img-fluid py-3 me-3 customer-logo"
                          />
                        </li>

                        <li class="list-inline-item">
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/clients/client-logo-5.svg"
                            width="120"
                            alt="clients logo"
                            class="img-fluid py-3 me-3 customer-logo"
                          />
                        </li>

                        <li class="list-inline-item">
                          <img
                            src="https://www.lifeatbabvip.com/site/assets/img/clients/client-logo-6.svg"
                            width="120"
                            alt="clients logo"
                            class="img-fluid py-3 me-3 customer-logo"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="price-feature-col pricing-action-info p-5 right-radius bg-light-subtle order-0 order-lg-1">
                  <h1 class="h3">Sign Up here</h1>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    class="mt-4 register-form"
                  >
      
       
  <div className="row">
    {/* Row 1 */}
   <div className="col-md-4 mb-3">
          <label>First Name *</label>
          <input
            type="text"
            className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
            {...register("first_name", { required: "First Name is required" })}
          />
          {errors.first_name && <div className="invalid-feedback">{errors.first_name.message}</div>}
        </div>
     {/* Middle Name (optional) */}
        <div className="col-md-4 mb-3">
          <label>Middle Name</label>
          <input type="text" className="form-control" {...register("middle_name")} />
        </div>

     {/* Last Name */}
        <div className="col-md-4 mb-3">
          <label>Last Name *</label>
          <input
            type="text"
            className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
            {...register("last_name", { required: "Last Name is required" })}
          />
          {errors.last_name && <div className="invalid-feedback">{errors.last_name.message}</div>}
        </div>

     {/* Email */}
        <div className="col-md-6 mb-3">
          <label>Email *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Phone */}
        <div className="col-md-6 mb-3">
          <label>Phone *</label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
        </div>

     {/* Gender */}
        <div className="col-md-6 mb-3">
          <label>Gender</label>
          <select className="form-select" {...register("gender")}>
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

   {/* Country */}
        <div className="col-md-6 mb-3">
          <label>Country *</label>
          <input
            type="text"
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
        </div>

   {/* State */}
        <div className="col-md-6 mb-3">
          <label>State *</label>
          <input
            type="text"
            className={`form-control ${errors.state ? "is-invalid" : ""}`}
            {...register("state", { required: "State is required" })}
          />
          {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
        </div>

   {/* City */}
        <div className="col-md-6 mb-3">
          <label>City *</label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
        </div>
   {/* Current Address */}
        <div className="col-12 mb-3">
          <label>Current Address *</label>
          <textarea
            className={`form-control ${errors.current_address ? "is-invalid" : ""}`}
            rows="2"
            {...register("current_address", { required: "Current address is required" })}
          ></textarea>
          {errors.current_address && <div className="invalid-feedback">{errors.current_address.message}</div>}
        </div>

    {/* Permanent Address */}
        <div className="col-12 mb-3">
          <label>Permanent Address *</label>
          <textarea
            className={`form-control ${errors.permanent_address ? "is-invalid" : ""}`}
            rows="2"
            {...register("permanent_address", { required: "Permanent address is required" })}
          ></textarea>
          {errors.permanent_address && <div className="invalid-feedback">{errors.permanent_address.message}</div>}
        </div>

            {/* file upload*/}
     {/* Resume - Required PDF File */}
    <div className="col-12 mb-3">
      <label>Resume (PDF) *</label>
      <input
        type="file"
        className={`form-control ${errors.resume ? "is-invalid" : ""}`}
        accept=".pdf"
        {...register("resume", {
          required: "Resume is required",
          validate: {
            isPdf: (fileList) =>
              fileList && fileList[0]?.type === "application/pdf" || "Only PDF files are allowed",
          },
        })}
      />
      {errors.resume && (
        <div className="invalid-feedback">{errors.resume.message}</div>
      )}
    </div>

     {/* Cover Letter - Optional */}
    <div className="col-12 mb-3">
      <label>Cover Letter (optional)</label>
      <input
        type="file"
        className="form-control"
        accept=".pdf,.doc,.docx"
        {...register("coverLetter")}
      />
    </div>

 {/* Portfolio - Optional */}
    <div className="col-12 mb-3">
      <label>Portfolio (optional)</label>
      <input
        type="file"
        className="form-control"
        accept=".pdf,.doc,.docx"
        {...register("portfolio")}
      />
    </div>

  {/* Password */}
        <div className="col-md-6 mb-3">
          <label>Password *</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

         {/* Confirm Password */}
        <div className="col-md-6 mb-3">
          <label>Confirm Password *</label>
          <input
            type="password"
            className={`form-control ${errors.password_confirmation ? "is-invalid" : ""}`}
            {...register("password_confirmation", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.password_confirmation && (
            <div className="invalid-feedback">{errors.password_confirmation.message}</div>
          )}
        </div>
        


    {/* Row 9 */}
    <div className="col-12">
      <button type="submit" className="btn btn-primary w-100">{isLoading ? <ButtonLoader /> : "Register"}</button>
    </div>
  </div>


                    <p class="font-monospace fw-medium text-center text-muted mt-3 pt-4 mb-0">
                      Already have an account?{" "}
                      <Link
                        to={"/login/applicant"}
                        class="text-decoration-none"
                      >
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
