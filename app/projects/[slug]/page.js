import { allProjects } from "@/.contentlayer/generated";
import ProjectContent from "./components/ProjectContent";

export async function generatedStaticParams() {
  const projects = await allProjects;
  return projects.map((project) => ({ slug: project.slug }));
}

export const generateMetadata = async ({ params }) => {
  const project = allProjects.find(
    (project) => project._raw.flattenedPath === "projects/" + params.slug
  );

  return { title: project?.title, excerpt: project?.excerpt };
};

export default function ProjectDetailPage({ params }) {
  const project = allProjects.find(
    (project) => project._raw.flattenedPath === "projects/" + params.slug
  );

  return (
    <>
      <ProjectContent project={project} />
    </>
  );
}
