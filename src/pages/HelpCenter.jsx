import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { getHelpCenterDetailBySlug } from "../features/actions/helpCenter";

const HelpCenter = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { helpRelated, data } = useSelector(
    (state) => state.helpCenter.helpDetailData
  );

  useEffect(() => {
    dispatch(getHelpCenterDetailBySlug(slug));
  }, [slug]);

  return (
    <section class="support-content ptb-120">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-lg-4 col-md-4 d-none d-md-block d-lg-block">
            <div class="support-article-sidebar sticky-sidebar">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
                class="btn btn-primary mb-4 btn-sm"
              >
                <i class="fas fa-angle-left me-2"></i> Go Back
              </Link>
              <div class="nav flex-column nav-pills support-article-tab bg-light-subtle rounded-custom p-5">
                <h5 class="customh-5">Related Support Articles</h5>
                {Array.isArray(helpRelated) &&
                  helpRelated.map((item, idx) => (
                    <Link
                      to={`/help/${item?.slug}`}
                      class="text-muted text-decoration-none py-2 d-block"
                    >
                      {item?.question?.split(" ").slice(0, 3).join(" ") +
                        (item?.question?.split(" ").length > 3 ? "..." : "")}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-8 p-lg-5">
            <div class="support-article-wrap">
              <h5 class="customh-5 mb-4 fw-bold">{data?.question}</h5>
              {parse(data?.answer)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;
