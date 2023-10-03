"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { allPosts } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const Items = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((post, i) => {
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
              className="bg-white relative overflow-hidden group"
            >
              <Link href={post.url} className="relative block overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1064}
                  height={644}
                  className="object-cover object-center h-[200px] duration-300 transition-all ease-in-out group-hover:scale-[1.05]"
                />
              </Link>
              <div className="p-8">
                <p className="text-gray-500 mb-3 uppercase text-[12px] tracking-[1px]">
                  {format(parseISO(post.date), "LLL d, yyyy")} &bull;{" "}
                  {post.author}
                </p>
                <h3 className="mb-4">
                  <Link href={post.url} className="text-lg leading-none">
                    {post.title}
                  </Link>
                </h3>

                <p>
                  <Link
                    href={post.url}
                    className="text-[12px] tracking-[2px] uppercase border-b-2 pb-2 inline-block border-violet-600"
                  >
                    Read more
                  </Link>
                </p>
              </div>
            </motion.div>
          );
        })}
    </>
  );
};

const Posts = ({ className, itemPerPage, archive = false, params }) => {
  const ref = React.useRef(null);
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [clickPaginate, setClickPaginate] = React.useState(false);

  let items = null;

  if (archive === false) {
    items = allPosts.sort((a, b) =>
      compareDesc(new Date(a.date), new Date(b.date))
    );
  } else {
    if (params?.slug) {
      items = allPosts.filter((post) =>
        post.categories.some(
          (category) =>
            category.title
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "") === params.slug
        )
      );
    }
  }

  React.useEffect(() => {
    const endOffset = itemOffset + itemPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemPerPage));

    if (clickPaginate === true) {
      setTimeout(function () {
        ref.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      }, 300);
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
        <div className="lg:w-10/12 mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

export default Posts;
