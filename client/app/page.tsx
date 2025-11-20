import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CallToSupport from "@/components/home/CallToSupport";
import ClientsSwiper from "@/components/home/ClientsSwiper";
import Hero from "@/components/home/Hero";
import OurImpact from "@/components/home/OurImpact";
import OurServices from "@/components/home/OurServices";
import Testimonial from "@/components/home/Testimonial";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import { WhatWeAre } from "@/components/home/WhatWeAre";

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
      <WhatWeAre />
      <OurImpact />
      <ClientsSwiper />
      <CallToSupport />
      <OurServices />
      <UpcomingEvents />
      <Testimonial />
      <Footer />
		</>
	);
}
