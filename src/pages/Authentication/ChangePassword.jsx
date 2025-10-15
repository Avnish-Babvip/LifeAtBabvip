import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import { changePassword } from "../../features/actions/authentication";
import { resetErrorMessage } from "../../features/slices/authentication";

const ChangePassword = () => {
  const assetRoute = `${
    import.meta.env.VITE_PRODUCTION === "true"
      ? import.meta.env.VITE_ASSETS
      : ""
  }`;

  const dispatch = useDispatch();
  const { isLoading, applicantData, errorMessage } = useSelector(
    (state) => state.authentication
  );
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return (
      password.length >= 8 || "Password must be at least 8 characters long"
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newData = {
      ...data,
      email: applicantData?.applicant?.email,
    };
    dispatch(changePassword(newData));
    reset();
  };

  // useEffect(() => {
  //   isPasswordChanged && navigate("/login/applicant");
  // }, [isPasswordChanged]);

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, []);

  return (
    <>
      <section
        class="sign-up-in-section bg-light pb-40"
        style={{
          background: `url('assets/img/page-header-bg.svg')no-repeat right bottom`,
        }}
      >
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-lg-5 col-md-8 col-12">
              <a href="index.html" class="mb-4 d-block text-center">
                <img
                  src={`${assetRoute}/assets/img/dashboardIcons/BABVIPLOGO.png`}
                  className="mx-auto d-block"
                  height={50}
                  //   width={120}
                  alt="Logo"
                />
              </a>
              <div class="register-wrap p-5 bg-light-subtle shadow rounded-custom">
                <h1 class="h3">Change Password</h1>
                <p class="text-muted">Please enter your new password.</p>

                <form
                  class="mt-4 register-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div class="row">
                    <div class="col-sm-12 mb-3">
                      <label for="password" class="mb-1">
                        Current Password <span class="text-danger">*</span>
                      </label>
                      <div class="input-group ">
                        <input
                          {...register("current_password", {
                            required: "Current password is required",
                            // validate: validatePassword,
                          })}
                          type="text"
                          class="form-control"
                          placeholder="Password"
                        />
                      </div>
                      {errors.current_password && (
                        <span
                          className="text-danger"
                          style={{ "font-size": "14px" }}
                        >
                          {errors.current_password.message}
                        </span>
                      )}
                    </div>
                    <div class="col-sm-12 mb-3">
                      <label class="mb-1">
                        New Password <span class="text-danger">*</span>
                      </label>
                      <div class="input-group ">
                        <input
                          {...register("new_password", {
                            required: "New password is required",
                            validate: validatePassword,
                            // validate: (value) =>
                            //   value === watch("password") ||
                            //   "Passwords do not match",
                          })}
                          type="text"
                          class="form-control"
                          placeholder="New Password"
                        />
                      </div>
                      {errors.new_password && (
                        <span
                          className="text-danger"
                          style={{ "font-size": "14px" }}
                        >
                          {errors.new_password.message}
                        </span>
                      )}
                    </div>
                    <div class="col-sm-12 mb-3">
                      <label class="mb-1">
                        Confirm New Password <span class="text-danger">*</span>
                      </label>
                      <div class="input-group ">
                        <input
                          {...register("new_password_confirmation", {
                            required: "Confirm new password is required",
                            validate: (value) =>
                              value === watch("new_password") ||
                              "Passwords do not match",
                          })}
                          type="text"
                          class="form-control"
                          placeholder="Confirm new Password"
                        />
                      </div>
                      {errors.new_password_confirmation && (
                        <span
                          className="text-danger"
                          style={{ "font-size": "14px" }}
                        >
                          {errors.new_password_confirmation.message}
                        </span>
                      )}
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
                        {isLoading ? <ButtonLoader /> : "Create a new password"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
