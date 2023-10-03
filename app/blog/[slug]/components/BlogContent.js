"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { allPosts } from "@/.contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import { getMDXComponent } from "next-contentlayer/hooks";
import PostCard from "./PostCard";

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const BlogContent = ({ post }) => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  let MDXContent;

  if (!posts) return null;

  if (!posts) {
    console.log("Post not found.");
  } else {
    MDXContent = getMDXComponent(post.body.code);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.2,
          duration: 0.5,
        },
      }}
      viewport={{ once: true }}
      className="pt-44 pb-20 lg:py-44 container px-4 mx-auto"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-slate-900 text-center text-4xl/none lg:text-6xl/none font-medium">
            {post.title}
          </h1>
          <p className="text-slate-500 mt-10">
            <span className="inline-flex space-x-3">
              <span>{format(parseISO(post.date), "LLL d, yyy")}</span>
              <span>&bull;</span>
              <span>{post.author}</span>
            </span>

            <span className="mx-3">&bull;</span>

            {post.categories?.map((category, i) => (
              <Link
                key={i}
                href={`/blog/categories/${slugify(category.title)}`}
                className="font-medium"
              >
                {category.title}
                {i < post.categories.length - 1 ? ", " : ""}
              </Link>
            ))}
          </p>
        </div>
        <div className="mb-16">
          <Image
            src={post.image}
            width={1065}
            height={644}
            alt={post.title}
            className="object-cover object-top"
          />
        </div>

        <article className="prose mx-auto max-w-2xl">
          <MDXContent />
        </article>

        <div className="max-w-4xl mx-auto mt-20 lg:mt-32">
          <h2 className="text-2xl text-gray-700 mb-10">More Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts
              .filter((a) => post.title !== a.title)
              .map((item, i) => {
                if (i > 2) return null;
                return <PostCard key={i} index={i} post={item} />;
              })}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              href="/blog"
              className="transition-all duration-300 ease-in-out text-[11.5px] tracking-[2px] font-bold uppercase bg-violet-600 py-4 px-5 text-white hover:bg-white hover:text-violet-600 hover:shadow-2xl"
            >
              View All Blog Posts
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogContent;
