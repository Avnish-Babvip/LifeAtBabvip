import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../../features/actions/department";

const Style1 = ({ data }) => {
  const assetRoute = `${
    import.meta.env.VITE_PRODUCTION === "true"
      ? import.meta.env.VITE_ASSETS
      : ""
  }`;
  const dispatch = useDispatch();
  const { departmentData } = useSelector((state) => state.department);

  useEffect(() => {
    dispatch(getAllDepartments());
  }, []);

  return (
    <div>
      <section class="team-section ptb-120">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 col-md-12">
              <div class="section-heading text-center">
                <h5 class="h6 text-primary">{data?.subtitle}</h5>
                <h2>{data?.title}</h2>
                <p>{data?.description}</p>
              </div>
            </div>
          </div>
          <div class="row">
            {Array.isArray(departmentData) &&
              departmentData.map((item, idx) => (
                <div class="col-lg-3 col-md-6">
                  <div class="team-single-wrap mt-5">
                    <div class="team-img rounded-custom">
                      <img
                        src={
                          item?.department_image
                            ? `${
                                import.meta.env.VITE_REACT_APP_IMAGE_PATH_CUSTOM
                              }/${item?.department_image}`
                            : `${assetRoute}/placeholder.webp`
                        }
                        alt="department"
                        class="img-fluid position-relative"
                        style={{
                          width: "320px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div class="team-info mt-4 text-center">
                      <h5 class="h6 mb-1">{item?.Department_name}</h5>
                      <p class="text-muted small mb-0"></p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Style1;
