import { allPosts } from "@/.contentlayer/generated";
import Hero from "@/app/about/components/Hero";
import Posts from "../../components/Posts";
import Subscribe from "@/components/Subscribe";

export default function BlogCategoriesPage({ params }) {
  const newTitle = params?.slug.replace("-", " ");
  let itemsTotal = 0;
  let items = null;

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
    itemsTotal = items.length;
  }

  return (
    <>
      <Hero
        className="pt-52 pb-24 capitalize"
        title={`${newTitle} (${itemsTotal})`}
        subTitle="Category"
      />
      <Posts
        className="pt-0 pb-52"
        archive={true}
        params={params}
        itemPerPage={6}
      />
      <Subscribe className="py-16 pt-64 lg:py-32 bg-violet-600" />
    </>
  );
}
