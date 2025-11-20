import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="container py-4">
      <div className="row">
        <div className="col-12 order-md-first position-relative mb-0 mb-md-3">
          <div className="position-relative rounded-4 overflow-hidden z-0">
            <div className="ratio ratio-16x9"></div>

            <Image
              src="https://images.unsplash.com/photo-1512238972088-8acb84db0771?w=1500&auto=format&fit=crop&q=60"
              alt="Image"
              fill
              className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-0"
            />
          </div>

          <div className="position-absolute z-2 top-0 start-0 w-100 h-100">
            <span
              className="position-absolute top-50 start-50 w-25 h-25 rounded-4 d-none-dark rtl-flip user-select-none"
              style={{
                backgroundImage: 'url("assets/img/Krall Logo -Primary.svg")',
                backgroundPosition: "center",
                backgroundSize: "3rem",
                backgroundRepeat: "no-repeat",
                transform: "translate(-50%, -50%)",
                opacity: "55%",
              }}
            />

            <span
              className="d-none position-absolute top-0 start-0 w-100 h-100 rounded-4 d-block-dark rtl-flip"
              style={{
                background: "linear-gradient(-90deg, #1b273a 0%, #1f2632 100%)",
              }}
            />

            <div
              className="text-center container z-1 position-absolute bottom-0 px-4 py-3 d-none d-md-block"
              style={{ background: "rgba(45,36,0,0.82)" }}
            >
              <h2 className="pb-1 pb-md-2 pb-lg-3">THE KRALL K&apos;OMMUNITY</h2>
              <p className="pb-sm-2 pb-lg-0 mb-2 mb-lg-3">
                Since 2015, we have been fulfilling the small dreams and big plans of
                millions of people. You can find literally everything here.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile version */}
        <div className="col-12">
          <div className="text-center d-md-none container z-1 px-4 py-3 rounded-4">
            <h2 className="pb-1 pb-md-2 pb-lg-3">THE KRALL K&apos;OMMUNITY</h2>
            <p className="pb-sm-2 pb-lg-0 mb-2 mb-lg-3">
              Since 2015, we have been fulfilling the small dreams and big plans of
              millions of people. You can find literally everything here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
