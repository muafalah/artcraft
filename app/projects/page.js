import Hero from "../about/components/Hero";
import Projects from "./components/Projects";
import CTA from "./components/CTA";

export const metadata = {
  title: "Projects - ArtCraft",
};

export default function ProjectsPage() {
  return (
    <>
      <Hero className="pt-52 pb-24" title="Projects" subTitle="Our Projects" />
      <Projects className="pt-0 pb-52" itemPerPage={4} />
      <CTA
        className="py-32 bg-violet-600"
        cta_label="Get in touch"
        cta_link="contact/"
        title="Do you have project in mind?"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiatillum expedita explicabo accusantium aut ut optio at."
      />
    </>
  );
}
