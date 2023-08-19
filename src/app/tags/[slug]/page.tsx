import { fetchTag } from "~/actions/tags";

import PageLayout from "~/widgets/layout";
import HomeRow from "~/widgets/home-row";
import { Box } from "~/widgets/box";
import { ProjectCard } from "~/widgets/project-card";
import { Article } from "~/widgets/article";
import PublicationList from "~/views/publication-list";

type PropTypes = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: PropTypes) => {
  const slug = params?.slug || "";
  const {
    projectList,
    eventList,
    publicationList,
    postList,
    title,
    description,
  } = await fetchTag(slug);

  const hasPublications =
    publicationList && Boolean(Object.keys(publicationList).length);
  const hasProjects = projectList && Boolean(projectList.length);
  const hasPresentations = eventList && Boolean(eventList.length);
  const hasPosts = postList && Boolean(postList.length);

  return (
    <PageLayout>
      <PageLayout.Header title={title} subtitle={description} />
      {hasProjects && (
        <HomeRow background="white">
          <HomeRow.Title>Projects</HomeRow.Title>
          {hasProjects && (
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
          )}
        </HomeRow>
      )}
      {hasPresentations && (
        <HomeRow background="surface-01" prominance="center">
          <HomeRow.Title>Presentations</HomeRow.Title>
          <Box display="flex" gap={2} flexDirection="column">
            {eventList.map((e) => (
              <Article
                key={e.id}
                title={e.title}
                summary={e.briefSummary}
                date={e.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                href={`/events/${e.id}`}
              />
            ))}
          </Box>
        </HomeRow>
      )}
      {hasPublications && (
        <HomeRow background="white">
          <HomeRow.Title>Publications</HomeRow.Title>
          <PageLayout.List>
            <PublicationList publicationList={publicationList} />
          </PageLayout.List>
        </HomeRow>
      )}
      {hasPosts && (
        <HomeRow prominance="center" background="white">
          <HomeRow.Title>Posts</HomeRow.Title>
          <Box display="flex" gap={2} flexDirection="column">
            {postList.map((e) => (
              <Article
                key={e.id}
                image={e.img}
                title={e.title}
                summary={e.description}
                href={`/posts/${e.id}`}
                tag={e.tags.length ? e.tags[0].title : undefined}
              />
            ))}
          </Box>
        </HomeRow>
      )}
    </PageLayout>
  );
};

export default Page;
