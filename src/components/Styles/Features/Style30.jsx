import React, { useState } from 'react'
import VideoModal from '../../VideoModal/VideoModal'
import { Link } from 'react-router-dom';

const Style30 = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
    <section class="counter-with-video pt-60 pb-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="cyber-video-img" style={{"background": `url('assets/img/video_bg.png')no-repeat center top/cover`}}>
                            <Link  onClick={() =>
                        "http://www.youtube.com/watch?v=hAP2QF--2Dg" &&
                        setShowVideo(true)
                      } class="video-icon popup-youtube popup-video-btn text-decoration-none"><i class="fas fa-play"></i>
                            </Link>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mt-5 mt-lg-0">
                            <div class="section-heading mb-5">
                                <h5 class="h6 text-primary">Protect to your life</h5>
                                <h2>
                                    Partner With One of the Premier as Cyber security
                                </h2>
                                <p>
                                    Interactively fabricate extensive partnerships whereas virtual processes. Dynamically productivate
                                    equity invested portals before cross functional communities reconceptualize
                                    goal-oriented core competencies.
                                </p>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="bg-white p-4 cyber-count-box mb-30 mb-lg-0">
                                        <h2 class="text-primary">50k+</h2>
                                        <h5 class="h-6">Happy Clients</h5>
                                        <p>
                                            If you use this is regularly keephosting bandwidth bill
                                            nostrud amet.
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="bg-white p-4 cyber-count-box">
                                        <h2 class="text-primary">7 k+</h2>
                                        <h5 class="h-6">Success Project</h5>
                                        <p>
                                            If you use this si regularly keephosting bandwidth bill
                                            nostrud amet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {showVideo && (
        <VideoModal
          videoUrl={"http://www.youtube.com/watch?v=hAP2QF--2Dg"}
          setShowVideo={setShowVideo}
        />
      )}
        </>
  )
}

export default Style30