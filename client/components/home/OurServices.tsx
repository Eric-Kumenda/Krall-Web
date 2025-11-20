// components/OurServices.tsx
import { FC } from "react";
import { Book, Calendar, Camera, Coffee, Video, Hamburger } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const services: Service[] = [
  {
    title: "Library Services",
    description: "Lorem ipsum dolor sit amet consecteur con balor. Mit un ast emt.",
    icon: <Book className="w-8 h-8" />,
    link: "/services#library",
  },
  {
    title: "Event Planning & Organizing",
    description: "Lorem ipsum dolor sit amet consecteur con balor. Mit un ast emt.",
    icon: <Calendar className="w-8 h-8" />,
    link: "/services#event",
  },
  {
    title: "Creative Studio/Space",
    description: "Lorem ipsum dolor sit amet consecteur con balor. Mit un ast emt.",
    icon: <Camera className="w-8 h-8" />,
    link: "/services#studio",
  },
  {
    title: "Coffee & Snack Bar",
    description: "Lorem ipsum dolor sit amet consecteur con balor. Mit un ast emt.",
    icon: <Coffee className="w-8 h-8" />,
    link: "/services#coffee",
  },
  {
    title: "Videography & Photography Coverage",
    description: "Lorem ipsum dolor sit amet consecteur con balor. Mit un ast emt.",
    icon: <Video className="w-8 h-8" />,
    link: "/services#photography",
  },
  {
    title: "BBQ & Exterior Lounge",
    description: "Lorem ipsum dolor sit amet consecteur con balor. Mit un ast emt.",
    icon: <Hamburger className="w-8 h-8" />,
    link: "/services#bbq",
  },
];

const OurServices: FC = () => {
  return (
    <section className="py-3">
      <div className="container py-2">
        <div className="row">
          <div className="col text-center">
            <h3 style={{ fontFamily: "Montserrat, sans-serif" }}>Our Services</h3>
            <hr className="mx-auto border-primary text-primary border-3 opacity-100 my-1" />
          </div>
        </div>
        <div className="row row-cols-2 row-cols-md-3 g-4 my-0 my-lg-n2 pb-md-3">
          {services.map((service) => (
            <div key={service.title} className="col animate-underline">
              <div className="py-md-1 py-lg-2 pe-sm-2">
                <div className="d-block fs-1 my-1">{service.icon}</div>
                <h6 className="d-inline-flex fs-6 fw-bold mb-2 mt-1 animate-target">
                  {service.title}
                </h6>
                <p className="fs-sm mb-0">{service.description}</p>
                <a className="btn btn-outline-light btn-sm my-2" href={service.link}>
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
