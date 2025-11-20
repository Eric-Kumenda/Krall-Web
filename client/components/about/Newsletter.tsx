"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend or service like Mailchimp
    console.log("Subscribed:", email);
  };

  return (
    <section className="bg-body-tertiary py-4">
      <div className="container pt-sm-2 pt-md-3 pt-lg-4 pt-xl-5">
        <div className="row">
          <div className="col d-flex flex-column align-items-center mb-5 mb-md-0">
            <h2 className="h4 mb-2">Sign up to our newsletter</h2>
            <p className="text-body pb-2 pb-sm-3">
              Receive our latest updates about our products &amp; promotions
            </p>

            <form
              className="d-flex needs-validation pb-1 pb-sm-2 pb-md-3 pb-lg-0 mb-4 mb-lg-5"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="position-relative w-100 me-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button className="btn btn-primary px-3" type="submit">
                Subscribe
              </button>
            </form>

            {/* Social Buttons */}
            <div className="d-flex gap-3">

              {/* Instagram */}
              <a
                className="btn btn-secondary d-flex justify-content-center align-items-center btn-icon rounded-circle"
                href="#!"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-instagram fs-5"
                >
                  <path d="M8 0C5.829 0..." />
                </svg>
              </a>

              {/* Facebook */}
              <a
                className="btn btn-secondary d-flex justify-content-center align-items-center btn-icon rounded-circle"
                href="#!"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-facebook fs-5"
                >
                  <path d="M16 8.049c0-4.446..." />
                </svg>
              </a>

              {/* YouTube */}
              <a
                className="btn btn-secondary d-flex justify-content-center align-items-center btn-icon rounded-circle"
                href="#!"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-youtube fs-5"
                >
                  <path d="M8.051 1.999h.089..." />
                </svg>
              </a>

              {/* Telegram */}
              <a
                className="btn btn-secondary d-flex justify-content-center align-items-center btn-icon rounded-circle"
                href="#!"
                aria-label="Telegram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-telegram fs-5"
                >
                  <path d="M16 8A8 8 0 1 1 0 8..." />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
