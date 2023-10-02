import Testimonial from "@/components/Testimonial";
import Hero from "./components/Hero";
import Story from "./components/Story";
import WhyUs from "./components/WhyUs";
import Team from "./components/Team";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Hero className="pt-52 mb-24" />
      <Story />
      <WhyUs className="pt-52 pb-0" />
      <Testimonial className="pt-10 lg:pt-44 pb-10 lg:pb-32" />
      <Team className="py-10 lg:py-32" />
      <Subscribe className="bg-violet-600 py-10 lg:py-32" />
      <Footer className="bg-white py-16" />
    </>
  );
}
