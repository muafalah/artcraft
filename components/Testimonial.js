"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const testimonialContent = {
  heading: {
    title: "Hear what our customers say.",
    subTitle: "Testimonials",
  },
  testimonials: [
    {
      img: "/images/person-1-min.jpg",
      name: "Jane Cooper",
      titleRole: "Homeowner",
      quote:
        "Working with ArtCraft was a dream come true. They truly understood our vision for our dream home and turned it into a stunning reality. Their attention to detail and creativity exceeded our expectations.",
    },
    {
      img: "/images/person-2-min.jpg",
      name: "Alexandra Moore",
      titleRole: "Interior Designer",
      quote:
        "I've had the privilege of partnering with ArtCraft on several projects. Their ability to combine functionality in their designs is truly remarkable. Their spaces provide the perfect canvas for interior design excellence.",
    },
    {
      img: "/images/person-3-min.jpg",
      name: "James Mayer",
      titleRole: "Landscape Architect",
      quote:
        "Collaborating with ArtCraft on projects has been a rewarding experience. Their ability to seamlessly integrate indoor and outdoor spaces, creating a harmonious flow, has elevated the overall design and user experience.",
    },
  ],
};

const Testimonial = ({ className }) => {
  const slideRef = React.useRef(null);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isEnd, setIsEnd] = React.useState(null);
  const [isBeginning, setIsBeginning] = React.useState(null);

  React.useEffect(() => {
    setIsEnd(slideRef.current.swiper.isEnd);
    setIsBeginning(slideRef.current.swiper.isBeginning);
  }, []);

  const prevHandler = React.useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current.swiper.slidePrev();
  }, [slideRef]);

  const nextHandler = React.useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current.swiper.slideNext();
  }, [slideRef]);

  return (
    <section className={`${className} overflow-hidden`}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-8/12 flex gap-0 items-center">
            <div className="text-center w-auto md:w-screen max-w-full md:max-w-xl mx-auto mb-16">
              {testimonialContent.heading.subTitle && (
                <motion.span
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.2,
                      duration: 0.5,
                    },
                  }}
                  viewport={{ once: true }}
                  className="uppercase tracking-[3px] text-[12.5px] mb-5 inline-block text-gray-500"
                >
                  {testimonialContent.heading.subTitle}
                </motion.span>
              )}
              {testimonialContent.heading.title && (
                <motion.h2
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.3,
                      duration: 0.5,
                    },
                  }}
                  viewport={{ once: true }}
                  className="text-2xl lg:text-4xl"
                >
                  {testimonialContent.heading.title}
                </motion.h2>
              )}
            </div>
          </div>
        </div>
        <div className="lg:flex justify-start lg:justify-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.9,
                duration: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="w-full lg:w-10/12 lg:flex gap-0 items-center"
          >
            <Swiper
              ref={slideRef}
              speed={700}
              spaceBetween={30}
              onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
              className="z-50 py-32 mb-7 relative flex items-center"
            >
              {testimonialContent.testimonials.map((testimonial, i) => (
                <SwiperSlide key={i} className="w-full">
                  <div className="block md:flex overflow-y-visible mt-10 items stretch bg-white">
                    <div className="md:w-4/12">
                      <Image
                        src={testimonial.img}
                        alt={testimonial.name}
                        width={379}
                        height={320}
                        className="object-cover object-center !h-full !w-full"
                      />
                    </div>
                    <div className="md:w-8/12 p-7 md:p-16 flex items-center">
                      <div>
                        <blockquote className="text-lg mb-7">
                          <span className="text-[200px] leading-[0] relative text-violet-600 block">
                            &ldquo;
                          </span>
                          {testimonial.quote}
                        </blockquote>
                        <div className="flex space-x-3 text-sm">
                          <strong>{testimonial.name}</strong>
                          <span>&mdash;</span>
                          <span>{testimonial.titleRole}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.9,
              duration: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="flex space-x-3">
            <button
              onClick={prevHandler}
              className={`${
                isBeginning == true
                  ? "opacity-30 bg-gray-300 text-gray-600 !cursor-pointer"
                  : "opacity-100 bg-violet-600 text-white"
              } relative top-0 group transition-all duration-300 ease-in-out w-12 h-12 cursor-pointer rounded-full inline-flex justify-center items-center`}
            >
              <BiChevronLeft
                className={`text-3xl text-primary text-all duration-300 ease-in-out group-hover:text-white${
                  isBeginning == true
                    ? "group-hover:!text-gray-600"
                    : "group-hover:text-white"
                }`}
              />
            </button>
            <button
              onClick={nextHandler}
              className={`${
                isEnd == true
                  ? "opacity-30 bg-gray-300 text-gray-600 !cursor-pointer"
                  : "opacity-100 bg-violet-600 text-white"
              } relative top-0 group transition-all duration-300 ease-in-out w-12 h-12 cursor-pointer rounded-full inline-flex justify-center items-center`}
            >
              <BiChevronRight
                className={`text-3xl text-primary text-all duration-300 ease-in-out group-hover:text-white${
                  isEnd == true
                    ? "group-hover:!text-gray-600"
                    : "group-hover:text-white"
                }`}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
