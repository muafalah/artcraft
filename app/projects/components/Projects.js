"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { allProjects } from "@/.contentlayer/generated";
import { compareDesc } from "date-fns";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const Items = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((project, i) => {
          i *= 0.05;
          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: i,
                  duration: 0.3,
                },
              }}
              viewport={{ once: true }}
              className="relative overflow-hidden w-full lg:w-6/12 p-2 group"
            >
              <Link
                href={project.url}
                className="overflow-hidden block relative"
              >
                <Image
                  src={project.image}
                  alt={project.image}
                  width={1064}
                  height={644}
                  className="object-cover object-center h-[400px] !max-w-full duration-300 transition-all ease-in-out group-hover:scale-[1.05]"
                />
              </Link>
              <div className="py-8 px-2">
                <span className="block mb-1 text-gray-500">{project.role}</span>
                <h3 className="mb-4">
                  <Link href={project.url} className="text-2xl leading-none">
                    {project.title}
                  </Link>
                </h3>
              </div>
            </motion.div>
          );
        })}
    </>
  );
};

const Projects = ({ className, itemPerPage }) => {
  const items = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const ref = React.useRef();
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [clickPaginate, setClickPaginate] = React.useState(false);

  React.useEffect(() => {
    const endOffset = itemOffset + itemPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemPerPage));

    if (clickPaginate === true) {
      ref.current?.scrollIntoView({ top: -50, behavior: "smooth" });
      setClickPaginate(false);
    }
  }, [itemOffset, itemPerPage, clickPaginate, items]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemPerPage) % items.length;
    setClickPaginate(true);
    setItemOffset(newOffset);
  };

  if (!items) return null;

  return (
    <section className={`${className}`} ref={ref}>
      <div className="container px-4 mx-auto">
        <div className="lg:w-10/12 mx-auto flex flex-wrap mb-10">
          <Items currentItems={currentItems} />
        </div>

        <div className="lg:w-10/12 mx-auto flex flex-wrap">
          <ReactPaginate
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="Previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
