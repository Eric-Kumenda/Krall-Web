"use client";

import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  description: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Moses Kibe Kihiko",
    role: "Director",
    image:
      "https://plus.unsplash.com/premium_photo-1664392176522-452c3bd83244?auto=format&fit=crop&q=60&w=500",
    description:
      "John Doe is a renowned filmmaker who began her career in advertising...",
  },
  {
    name: "John Doe",
    role: "Manager",
    image:
      "https://images.unsplash.com/photo-1633999033928-2eda1e5dbb14?auto=format&fit=crop&q=60&w=500",
    description:
      "John Doe is a renowned filmmaker who began her career in advertising...",
  },
  {
    name: "John Doe",
    role: "Manager",
    image:
      "https://images.unsplash.com/photo-1633999033928-2eda1e5dbb14?auto=format&fit=crop&q=60&w=500",
    description:
      "John Doe is a renowned filmmaker who began her career in advertising...",
  },
];

export default function TeamSection() {
  return (
    <section className="container py-3">
      <h5
        className="text-uppercase text-center text-primary mt-2 mb-3"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        The Team
      </h5>

      <hr className="mx-auto border-primary text-primary border-3 opacity-100 my-1" />

      <p className="text-center pb-2 pb-sm-3 mb-0 mt-2">
        We are committed to supporting independent storytellers on the African
        continent who describe the world as they see it, from their own unique
        histories, experiences, imaginings and lenses.
      </p>

      {/* First ROW */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 justify-content-center g-4 mb-3 mb-md-4 mt-2">
        {teamMembers.slice(0, 1).map((member, index) => (
          <div className="col" key={index}>
            <TeamCard {...member} />
          </div>
        ))}
      </div>

      {/* Second ROW */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 justify-content-center g-4">
        {teamMembers.slice(1).map((member, index) => (
          <div className="col" key={index}>
            <TeamCard {...member} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TeamCard({ name, role, image, description }: TeamMember) {
  return (
    <div className="card hover-effect-scale hover-effect-opacity hover-effect-slide-up overflow-hidden h-auto">
      <div className="card-img-top position-relative overflow-hidden">
        <span className="bg-black bg-opacity-25 hover-effect-target position-absolute top-0 start-0 w-100 h-100 opacity-0 z-1"></span>

        {/* Overlay Social Icons */}
        <div className="d-flex justify-content-center align-items-center hover-effect-target position-absolute top-0 start-0 w-100 h-100 z-2 opacity-0">
          <div className="text-white bg-dark bg-opacity-50 d-flex align-items-center gap-3 rounded-pill py-2 px-3 fs-6">
            <a href="#">
              <span className="d-flex align-items-center fw-medium">
                {/* Linkedin Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-linkedin me-1"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0..." />
                </svg>
              </span>
            </a>

            <a href="#">
              <span className="d-flex align-items-center fw-medium">
                {/* Instagram Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-instagram me-1"
                >
                  <path d="M8 0C5.829 0..." />
                </svg>
              </span>
            </a>

            <a href="#">
              <span className="d-flex align-items-center fw-medium">
                {/* WhatsApp Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-whatsapp me-1"
                >
                  <path d="M13.601 2.326A7.854 7.854..." />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* IMAGE */}
        <div
          className="hover-effect-target ratio"
          style={{ ["--bs-aspect-ratio" as any]: "calc(7/8 * 100%)" }}
        >
          {/* You can replace <img> with <Image> once domains are added */}
          <img
            src={image}
            alt={name}
            className="img-fluid h-auto w-auto"
            style={{ objectFit: "none" }}
          />
        </div>
      </div>

      {/* CARD BODY */}
      <div
        className="card-body overflow-hidden z-2 position-relative hover-effect-slide-up-target bg-body"
        style={{ height: "94px" }}
      >
        <div className="hover-effect-show-displace-target">
          <h1
            className="fs-5 mt-2 card-title text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {name}
          </h1>
          <h1
            className="text-primary fs-6 mb-3 card-title text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <span className="mx-2">~</span>
            {role}
            <span className="mx-2">~</span>
          </h1>
        </div>

        <p
          className="card-text fs-6 border rounded py-3 px-2 bg-body"
          style={{ maxHeight: "160px", overflowY: "scroll" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
