import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="text-body shadow"
      style={{
        background: "linear-gradient(90deg, #74683a 0%, #60511b 100%)",
      }}
    >
      <div className="container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 text-center text-lg-start d-flex flex-column align-items-center align-items-lg-start item social">
            <a className="mx-auto" href="#">
              <Image
                src="/assets/img/Krall Logo -Primary.svg"
                width={48}
                height={48}
                alt="Krall Logo"
              />
            </a>
            <a className="mx-auto" href="#">
              <h5 className="mt-2">The Krall Konsult</h5>
            </a>
          </div>

          <div className="col-md-4 text-center text-lg-start d-flex flex-column item">
            <h3 className="fs-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
              ABOUT
            </h3>
            <ul className="list-unstyled">
              <li className="my-2 animate-underline">
                <a className="text-decoration-none animate-target" href="/about">
                  About Us
                </a>
              </li>
              <li className="my-2 animate-underline">
                <a className="text-decoration-none animate-target" href="/">
                  Manifesto
                </a>
              </li>
              <li className="my-2 animate-underline">
                <a className="text-decoration-none animate-target" href="/about">
                  Our Partners
                </a>
              </li>
              <li className="my-2 animate-underline">
                <a className="text-decoration-none animate-target" href="/team">
                  Our Team
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 text-center text-lg-start d-flex flex-column item">
            <h3 className="fs-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
              USEFUL LINKS
            </h3>
            <ul className="list-unstyled">
              <li className="my-2 animate-underline">
                <a className="text-decoration-none animate-target" href="/terms">
                  Privacy Policy
                </a>
              </li>
              <li className="my-2 animate-underline">
                <a className="text-decoration-none animate-target" href="/terms">
                  Terms of Use
                </a>
              </li>
              <li className="my-2 animate-underline">
                <a className="text-decoration-none animate-target" href="#">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center pt-3">
          <p className="mb-0">Copyright © 2025 THE KRALL</p>

          {/* Desktop icons */}
          <div className="d-none d-md-block d-flex">
            {/* Facebook */}
            <a className="btn btn-outline-light btn-sm me-2 rounded-0" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                width="1em"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect width="24" height="24" fill="none" />
                <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2c-.55,0-1,.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z" />
              </svg>
            </a>

            {/* Instagram */}
            <a className="btn btn-outline-light btn-sm me-2 rounded-0" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-32 0 512 512"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a className="btn btn-outline-light btn-sm rounded-0 me-2" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
