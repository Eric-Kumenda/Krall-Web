"use client";

import React from "react";

export const WhatWeAre: React.FC = () => {
  return (
    <section>
      <div className="container py-5">
        {/* Section Header */}
        <div className="row">
          <div className="col">
            <h3
              className="text-center"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              What We Are
            </h3>
            <hr className="mx-auto border-primary text-primary border-3 opacity-100 my-1" />
          </div>
        </div>

        {/* Section Content */}
        <div className="row py-3">
          {/* Image Column */}
          <div className="col">
            <div className="row">
              <div className="col-md-8 d-flex justify-content-center order-md-last">
                <img
                  className="w-100"
                  src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA=="
                  style={{ maxWidth: "300px", boxShadow: "23px 30px #ffffff06" }}
                  alt="What we are"
                />
              </div>
              <div className="col pb-2">
                <hr className="me-auto border-primary text-primary border-3 opacity-100 mt-4" />
                <h6>Lorem Ipsum Dolor Sit Amet Consecteur</h6>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="col d-flex flex-column justify-content-center align-items-start px-3 px-md-5 py-3 py-md-2">
            <h5
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              Always Amazing Experience
            </h5>
            <p className="py-3 mb-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
              veritatis nisi, consequatur, laborum libero a neque ducimus. Porro
              rem illum quo nostrum quisquam asperiores. Possimus facilis velit,
              voluptatibus!
            </p>
            <a href="/about" className="btn btn-outline-light me-2">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
