import { allPosts } from "@/.contentlayer/generated";
import BlogContent from "./components/BlogContent";

export async function generatedStaticParams() {
  const posts = await allPosts;
  return posts.map((post) => ({ slug: post.slug }));
}

export const generateMetadata = async ({ params }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === "blog/" + params.slug
  );

  return { title: post?.title, excerpt: post?.excerpt };
};

export default function BlogDetailPage({ params }) {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === "blog/" + params.slug
  );

  return (
    <>
      <BlogContent post={post} />
    </>
  );
}
