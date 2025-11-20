// components/UpcomingEvents.tsx
import { FC } from "react";

interface Event {
  id: string;
  date: string; // ISO format
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const events: Event[] = [
  {
    id: "eventOne",
    date: "2017-09-30",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum voluptas, aut ea quae!",
    description:
      "Alias earum, labore doloremque iusto a modi et, dolorem veritatis iste quis ab. Facere est optio, voluptate molestias aspernatur impedit perferendis odit?",
    imageUrl: "https://yevgenysim-turkey.github.io/touche/assets/img/8.jpg",
    link: "/event",
  },
  {
    id: "eventTwo",
    date: "2017-09-29",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum voluptas, aut ea quae!",
    description:
      "Alias earum, labore doloremque iusto a modi et, dolorem veritatis iste quis ab. Facere est optio, voluptate molestias aspernatur impedit perferendis odit?",
    imageUrl: "https://yevgenysim-turkey.github.io/touche/assets/img/9.jpg",
    link: "/event",
  },
  {
    id: "eventThree",
    date: "2017-09-28",
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum voluptas, aut ea quae!",
    description:
      "Alias earum, labore doloremque iusto a modi et, dolorem veritatis iste quis ab. Facere est optio, voluptate molestias aspernatur impedit perferendis odit?",
    imageUrl: "https://yevgenysim-turkey.github.io/touche/assets/img/10.jpg",
    link: "/event",
  },
];

const UpcomingEvents: FC = () => {
  return (
    <section className="container-fluid py-4">
      <div className="row pb-4">
        <div className="col text-center">
          <h3 style={{ fontFamily: "Montserrat, sans-serif" }}>Upcoming Events</h3>
          <p className="fs-sm mb-2">Get to experience events hosted by ...</p>
          <hr className="mx-auto border-primary text-primary border-3 opacity-100 my-1" />
        </div>
      </div>

      <div className="events">
        {events.map((event) => {
          const eventDate = new Date(event.date);
          const day = eventDate.getDate();
          const month = eventDate.toLocaleString("default", { month: "short" });

          return (
            <div key={event.id} className="event">
              <div className="event-sm collapse show">
                <div className="container border-top py-3">
                  <div className="row align-items-center py-6">
                    <div className="col-3 col-md-2 col-lg-1">
                      <time className="d-block text-center text-body-emphasis" dateTime={event.date}>
                        <span className="d-block mb-2 display-6 font-serif">{day}</span>
                        <span>{month}</span>
                      </time>
                    </div>
                    <div className="col-9 col-md-7 col-lg-8">
                      <div
                        className="collapsed h5 mb-4 mb-md-0 eventToggle"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${event.id}`}
                        aria-controls={event.id}
                        role="button"
                        aria-expanded={false}
                      >
                        <span>{event.title}</span>
                      </div>
                    </div>
                    <div className="col-9 col-md-3 offset-3 offset-md-0 text-md-end">
                      <a className="btn btn-outline-primary link-body-emphasis fs-sm" href={event.link}>
                        Register
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="event-lg bg-cover collapse"
                id={event.id}
                style={{ backgroundImage: `url('${event.imageUrl}')` }}
              >
                <div className="bg-black bg-opacity-50">
                  <div className="container">
                    <div className="row py-10">
                      <div className="col-md-8 col-lg-5">
                        <h4 className="text-primary text-xs">
                          <time dateTime={event.date}>{eventDate.toDateString()}</time>
                        </h4>
                        <h3 className="text-white mb-3">{event.title}</h3>
                        <p className="text-white text-opacity-75 mb-6">{event.description}</p>
                        <a className="btn btn-outline-primary text-white text-primary-hover" href={event.link}>
                          Register
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpcomingEvents;
