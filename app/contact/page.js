import Hero from "../about/components/Hero";
import ContactFrom from "./Components/ContactFrom";

export default function Contactpage() {
  return (
    <>
      <Hero className="pt-52 pb-24" title="Contact" subTitle="Get in touch" />
      <ContactFrom />
    </>
  );
}
