import { fetchFeaturedProject, fetchProjectList } from "~/actions/project";

import { Article } from "~/widgets/article";
import PageLayout from "~/widgets/layout";
import HomeRow from "~/widgets/home-row";

export const metadata = {
  title: `${process.env.STUDENT_NAME} | Projects`,
  description: `Research and academic pursuits of ${process.env.STUDENT_NAME}. Explore their work and delve into their expertise in their field of study.`,
};

const Projects = async () => {
  const projectList = await fetchProjectList();
  const featuredProject = await fetchFeaturedProject();

  return (
    <PageLayout>
      <PageLayout.Header title="Projects" />
      {featuredProject && (
        <HomeRow background="white">
          <HomeRow.Title>Featured Project</HomeRow.Title>
          <Article
            size="large"
            title={featuredProject.name}
            href={`/projects/${featuredProject.id}`}
            summary={featuredProject.summary}
            image={featuredProject.img}
            cta="View Project"
            tag={
              featuredProject.tags.length
                ? featuredProject.tags[0].title
                : undefined
            }
          />
        </HomeRow>
      )}
      {Boolean(projectList.length) && (
        <PageLayout.Container>
          <HomeRow.Title>All Projects</HomeRow.Title>
          <PageLayout.List>
            {projectList.map((x) => (
              <Article
                image={x.img}
                cta="View project"
                title={x.name}
                href={`/projects/${x.id}`}
                summary={x.summary}
                key={x.id}
              />
            ))}
          </PageLayout.List>
        </PageLayout.Container>
      )}
    </PageLayout>
  );
};

export default Projects;
