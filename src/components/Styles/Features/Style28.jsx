import React, { useEffect, useRef } from "react";
import Parallax from "parallax-js";

const Style28 = () => {
  const parallaxRef = useRef(null); // Reference for the parallax container

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init(); // Initialize AOS
    }

    if (parallaxRef.current) {
      new Parallax(parallaxRef.current, {
        relativeInput: true,
        clipRelativeInput: true,
      });
    }
  }, []);
  return (
    <>
      <section class="feature-section pt-60 pb-120">
        <div class="container">
          <div class="row align-items-lg-center justify-content-between">
            <div class="col-lg-5 order-lg-2 mb-7 mb-lg-0">
              <div class="mb-4 " data-aos="fade-up">
                <h2>Experience your Product with Integration</h2>
                <p>
                  Conveniently drive stand-alone total linkage for
                  process-centric content enthusiastically administrate robust
                  collaborative.{" "}
                </p>
              </div>
              <ul
                class="list-unstyled d-flex flex-wrap list-two-col mt-5 "
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <li>
                  <span class="d-block mb-4">
                    <i class="fas fa-user fa-2x text-primary"></i>
                  </span>
                  <h3 class="h5">Customer analysis</h3>
                  <p>
                    Objectively exceptional via customized capital expertise.
                  </p>
                </li>
                <li>
                  <span class="d-block mb-4">
                    <i class="fas fa-clock fa-2x text-primary"></i>
                  </span>
                  <h3 class="h5">Real time metrics</h3>
                  <p>Interactively integrate extensible users resource. </p>
                </li>
              </ul>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="pr-lg-4">
                <div
                  class="bg-light-subtle text-center rounded-custom overflow-hidden p-lg-5 p-3 mx-lg-auto "
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <img
                    src="assets/img/dashboard-img.png"
                    alt=""
                    class="img-fluid"
                  />
                  <div class="position-absolute bg-primary-dark z--1 dot-mask dm-size-16 dm-wh-350 top--40 left--40 top-left"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Style28;
