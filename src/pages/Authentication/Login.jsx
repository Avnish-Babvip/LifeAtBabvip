import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import { applicantLogin } from "../../features/actions/authentication";
import { resetErrorMessage } from "../../features/slices/authentication";

const Login = () => {
  const assetRoute = `${
    import.meta.env.VITE_PRODUCTION === "true"
      ? import.meta.env.VITE_ASSETS
      : ""
  }`;
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) || "Please enter a valid email address";
  };

  const dispatch = useDispatch();
  const { isUserLoggedIn, isLoading, errorMessage } = useSelector(
    (state) => state.authentication
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(applicantLogin(data));
    reset();
  };

  useEffect(() => {
    isUserLoggedIn && navigate("/applicant/dashboard");
  }, [isUserLoggedIn]);

  useEffect(() => {
    dispatch(resetErrorMessage());
    // dispatch(resetForgotPasswordState());
  }, []);
  return (
    <>
      <section
        class="sign-up-in-section bg-dark ptb-60"
        style={{
          background: `url('assets/img/page-header-bg.svg')no-repeat right bottom`,
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
                      src={`${assetRoute}/assets/img/dashboardIcons/logo resize.png`}
                      alt="logo"
                      class="img-fluid"
                    />
                  </a>
                  <div class="customer-testimonial-wrap mt-60">
                    <div class="tab-content" id="nav-tabContent">
                      <div
                        class="tab-pane fade active show"
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
                            <h5>test</h5>
                            kuhhjh
                          </blockquote>
                          <div class="author-info mt-4">
                            <h6 class="mb-0">jhgjhgjhgj</h6>
                            <span>kjhgjhgjh</span>
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
                          class=""
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
                          class=""
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
                      <p>jhvhjghghjjj</p>
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
                  <a href="index.html" class="mb-5 d-block d-xl-none d-lg-none">
                    <img
                      src={`${assetRoute}/assets/img/dashboardIcons/logo resize.png`}
                      alt="logo"
                      class="img-fluid"
                    />
                  </a>
                  <h1 class="h3">Login Here</h1>
                  <p class="text-muted">
                    Login here and start your journey with us.
                  </p>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    class="mt-4 register-form"
                  >
                    <div class="row">
                      <div class="col-sm-12">
                        <label
                          for="email"
                          class="mb-1 d-flex justify-content-between"
                        >
                          <div>
                            {" "}
                            Email <span class="text-danger">*</span>
                          </div>
                          {errors.email && (
                            <span
                              className="text-danger"
                              style={{ "font-size": "14px" }}
                            >
                              {errors.email.message}
                            </span>
                          )}
                        </label>
                        <div class="input-group mb-3">
                          <input
                            {...register("email", {
                              required: "Email is required",
                              validate: validateEmail,
                            })}
                            type="email"
                            class="form-control"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <label
                          for="password"
                          class="mb-1 d-flex justify-content-between"
                        >
                          <div>
                            {" "}
                            Password <span class="text-danger">*</span>
                          </div>{" "}
                          {errors.password && (
                            <span
                              className="text-danger "
                              style={{ "font-size": "14px" }}
                            >
                              {errors.password.message}
                            </span>
                          )}
                        </label>
                        <div class="input-group mb-3">
                          <input
                            {...register("password", {
                              // required: "Password is required",
                            })}
                            type="password"
                            value={"11111111"}
                            class="form-control"
                            placeholder="Password"
                          />
                        </div>

                        <div class="text-end mb-3">
                          <Link
                            to={"/login/password-reset"}
                            class="text-decoration-none text-primary fw-semibold"
                            style={{ "font-size": "0.9rem" }}
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                      {errorMessage && (
                        <span
                          className="text-danger text-center"
                          style={{ "font-size": "14px" }}
                        >
                          {errorMessage}
                        </span>
                      )}
                      <div class="col-12">
                        <button
                          disabled={isLoading}
                          type="submit"
                          class="btn btn-primary mt-3 d-block w-100"
                        >
                          {isLoading ? <ButtonLoader /> : "Log in"}
                        </button>
                      </div>

                      <div class="col-12">
                        <p class="font-monospace fw-medium text-center text-muted mt-3 pt-4 mb-0">
                          Don’t have an account?{" "}
                          <Link to={"/signup/applicant"} class="">
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </div>
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

export default Login;
