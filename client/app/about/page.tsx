import AboutBackground from "@/components/about/AboutBackground";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import NewsletterSection from "@/components/about/Newsletter";
import TeamSection from "@/components/about/Team";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<AboutHero />
			<AboutBackground />
			<MissionVision />
			<TeamSection />
			<NewsletterSection />
			<Footer />
		</>
	);
}
