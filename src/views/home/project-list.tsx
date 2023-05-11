import { fetchFeaturedProject, fetchProjectList } from "~/actions";

import { Box } from "~/widgets/box";
import HomeRow from "~/widgets/home-row";
import { Article } from "~/widgets/article";
import { ProjectCard } from "~/widgets/project-card";

const ProjectList = async () => {
  const [projectList, featuredProject] = await Promise.all([
    fetchProjectList(true),
    fetchFeaturedProject(),
  ]);

  if (!projectList.length) return null;

  return (
    <HomeRow background="surface-01">
      <HomeRow.Title>Projects</HomeRow.Title>
      {featuredProject && (
        <Box marginBottom={2}>
          <Article
            tag={
              Boolean(featuredProject.tags.length)
                ? featuredProject.tags[0].title
                : undefined
            }
            title={featuredProject.name}
            summary={featuredProject.summary}
            href={`/projects/${featuredProject.id}`}
            size="large"
            image={featuredProject.img}
            cta="View Project"
          />
        </Box>
      )}
      <Box
        display={["flex"]}
        flexDirection={["column", "row"]}
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        marginBottom={3}
        style={{ gridTemplateColumns: "repeat(3, 1fr)", width: "100%" }}
      >
        {projectList.map((x) => (
          <ProjectCard size="large" project={x} key={x.id} />
        ))}
      </Box>
      <HomeRow.CTA href="/projects">View all projects</HomeRow.CTA>
    </HomeRow>
  );
};

export default ProjectList;
