import { createClient } from "contentful";
import { Box } from "~/widgets/box";
import HomeRow from "~/widgets/home-row";
import { Article } from "~/widgets/article";

type Project = {
  id: string;
  name: string;
  tags: { id: string; title: string }[];
  img?: { src: string; alt: string };
  summary: string;
  activeCollaborators: string[];
};

const fetchProjects = async (): Promise<Project[]> => {
  const client = createClient({
    accessToken: process.env.CONTENFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
  });

  const entries = await client.getEntries({
    content_type: "project",
    locale: "en-US",
    "fields.feature": true,
  });

  if (!entries.items) return [];

  return entries.items.map((entry) => ({
    id: entry.sys.id,
    name: entry.fields.title,
    summary: entry.fields.summary,
    // @ts-ignore
    tags: entry.fields.tags?.map((x) => ({
      title: x.fields.title,
      id: x.sys.id,
    })),
    img: entry.fields.featuredImage
      ? {
          src: `https:${(entry.fields.featuredImage as any).fields.file.url}`,
          alt: (entry.fields.featuredImage as any).fields.description,
        }
      : undefined,
  })) as Project[];
};

const ProjectList = async () => {
  const projectList = await fetchProjects();

  if (!projectList.length) return null;

  return (
    <HomeRow background="surface-01" prominance="center">
      <HomeRow.Title>Projects</HomeRow.Title>
      <Box display="flex" flexDirection="column" gap={2}>
        {projectList.map((x) => (
          <Article
            image={x.img}
            key={x.name}
            cta="View project"
            href={`/projects/${x.id}`}
            title={x.name}
            summary={x.summary}
          />
        ))}
      </Box>
      <HomeRow.CTA href="/projects">View all projects</HomeRow.CTA>
    </HomeRow>
  );
};

export default ProjectList;
