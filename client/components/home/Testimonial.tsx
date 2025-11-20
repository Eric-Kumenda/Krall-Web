"use client";

import Image from "next/image";

export default function Testimonials() {
  const avatar =
    "https://images.unsplash.com/photo-1753889434816-4761b17e8e2e?w=500&auto=format&fit=crop&q=60";

  const testimonials = Array(7).fill({
    name: "Tony Knox",
    role: "Film Maker, Community Builder",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Curabitur vestibulum elit id purus laoreet, nec dignissim velit egestas. 
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
    avatar,
  });

  return (
    <section
      className="position-relative bg-dark"
      style={{
        background:
          "radial-gradient(#433921 1.5px, transparent 1.5px) 0 0/10px 10px, radial-gradient(#433921 1.5px, transparent 1.5px) 5px 5px/10px 10px",
      }}
    >
      <div className="container py-4 py-md-5 z-2 position-relative">
        <div className="d-flex flex-column justify-content-between flex-sm-row align-items-sm-center row gap-2 gap-sm-4 mb-4 mb-xl-5">
          <h2
            className="text-center text-sm-start mb-0 d-md-flex justify-content-between"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Testimonials
            <a className="d-flex justify-content-center align-items-center text-decoration-none animate-underline ms-md-3" href="#">
              <span className="text-body fs-xs animate-target pb-1">
                More on Instagram
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                width="1em"
                fill="currentColor"
                className="text-body ms-1"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </a>
          </h2>
        </div>

        <div className="row position-relative">
          <div className="col">
            <div id="testimonialSwiper" className="swiper">
              <div className="swiper-wrapper px-md-5">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="swiper-slide w-auto h-auto animate-underline"
                    style={{ maxWidth: 306 }}
                  >
                    <div
                      className="card bg-transparent border-0 shadow w-100 p-xl-2"
                      style={{ marginTop: 50 }}
                    >
                      <div
                        className="card-header border-0 d-flex flex-column align-items-center position-relative z-1"
                        style={{
                          background:
                            "linear-gradient(90deg, #333126 0%, #372e2f 100%)",
                        }}
                      >
                        <div
                          className="bg-body-secondary ratio ratio-1x1 rounded-circle overflow-hidden"
                          style={{
                            width: 100,
                            marginTop: -50,
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            width={100}
                            height={100}
                          />
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center fs-sm ps-2 ms-1">
                          <hr className="mx-auto border-primary text-primary border-3 opacity-100 mt-3" />
                          <div className="fw-semibold text-dark-emphasis">
                            <span className="fs-4 animate-target">{t.name}</span>
                          </div>
                          <div>
                            <span>{t.role}</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className="card-body position-relative z-1 pb-4 pb-lg-2 pb-xl-3"
                        style={{
                          background:
                            "linear-gradient(90deg, #333126 0%, #372e2f 100%)",
                        }}
                      >
                        <p className="px-2 fs-sm">{t.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Swiper Buttons */}
            <div className="d-flex justify-content-between w-100 mt-3">
              <button
                className="btn btn-outline-primary btn-icon rounded-circle animate-slide-start me-1"
                id="prev-testimonials"
                type="button"
                aria-label="Previous slide"
              >
                <svg
                  className="bi bi-chevron-left animate-target"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </button>

              <button
                className="btn btn-outline-primary btn-icon rounded-circle animate-slide-end"
                id="next-testimonials"
                type="button"
                aria-label="Next slide"
              >
                <svg
                  className="bi bi-chevron-right animate-target"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
