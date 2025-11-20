import Image from "next/image";

export default function AboutBackground() {
  return (
    <section
      id="mission"
      className="container py-3 pt-sm-4 pt-lg-5 mt-lg-2 mt-xl-4 mt-xxl-5"
      style={{ scrollMarginTop: "60px" }}
    >
      <div className="text-center mx-auto px-3 px-md-5">
        <h2
          className="text-uppercase text-center text-primary fs-6"
          style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "1px" }}
        >
          Background
        </h2>

        <p className="text-start pb-2 pb-md-3 pb-lg-4">
          The Krall was initially established as a library which relocated from
          Ongata Rongai to a garage in Acacia Village Estate in 2020.
          <br />
          After COVID-19 pandemic, the establishment expanded into a social &
          creative hub and is currently nurturing young entrepreneurs within the
          community.
        </p>

        <Image
          src="https://images.unsplash.com/photo-1742119971773-57e0131095b0?w=500&auto=format&fit=crop&q=60"
          alt="Avatar"
          width={64}
          height={64}
          className="rounded-circle d-block mx-auto mb-3"
        />

        <h6 className="mb-0">Moses Kibe Kihiko, Director</h6>
      </div>
    </section>
  );
}
