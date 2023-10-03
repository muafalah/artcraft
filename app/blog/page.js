import React from "react";
import Hero from "../about/components/Hero";
import Posts from "./components/Posts";
import Subscribe from "@/components/Subscribe";

export const metadata = {
  title: "Blogs - ArtCraft",
};

export default function BlogPage() {
  return (
    <>
      <Hero
        className="pt-52 pb-24"
        title="Recent Updates"
        subTitle="Our Blog"
      />
      <Posts className="pt-0 pb-52" itemPerPage={6} />
      <Subscribe className="py-16 pt-64 lg:py-32 bg-violet-600" />
    </>
  );
}
