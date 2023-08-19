import type { Metadata } from "next";

import GrantList from "~/views/grant-list";
import PublicationList from "~/views/publication-list";
import { Article } from "~/widgets/article";
import HomeRow from "~/widgets/home-row";
import renderRichToReact from "~/widgets/rich-text";
import PageLayout from "~/widgets/layout";

import {
  fetchFeaturedProject,
  fetchProject,
  fetchProjectList,
} from "~/actions/project";
import { ButtonLink } from "~/widgets/button-link";
import { Box } from "~/widgets/box";
import { CollabList } from "~/widgets/collab-list";

type PropTypes = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const projectList = await fetchProjectList();
  const featuredProject = await fetchFeaturedProject();
  const slugList = [];

  if (featuredProject) slugList.push({ slug: featuredProject.id });
  return projectList.map((x) => ({ slug: x.id })).concat(slugList);
};

export const generateMetadata = async ({
  params,
}: PropTypes): Promise<Metadata> => {
  const slug = params?.slug || "";
  const project = await fetchProject(slug);
  if (!project) return {};

  const ogImage = `/og?title=${encodeURIComponent(
    project.name
  )}&subtitle=${encodeURIComponent(
    project.tags.length ? project.tags[0].title : ""
  )}`;

  const url = `/projects/${slug}`;

  return {
    title: `${process.env.STUDENT_NAME} | ${project.name}`,
    description: project.summary,
    alternates: {
      canonical: url,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.summary,
      images: {
        url: ogImage,
        alt: "",
      },
    },
    openGraph: {
      title: project.name,
      type: "article",
      description: project.summary,
      url,
      locale: "en-US",
      images: [{ url: ogImage, alt: "", width: 1200, height: 630 }],
    },
  };
};

const Page = async ({ params }: PropTypes) => {
  const slug = params?.slug || "";
  const project = await fetchProject(slug);

  const hasPublications =
    project.publicationList &&
    Boolean(Object.keys(project.publicationList).length);
  const hasGrants =
    project.grantList && Boolean(Object.keys(project.grantList).length);
  const hasPresentations =
    project.presentationList && Boolean(project.presentationList.length);

  return (
    <PageLayout>
      <PageLayout.Header
        title={project.name}
        subtitle={project.summary}
        img={project.img}
      >
        <Box
          as="ul"
          display="flex"
          flexWrap="wrap"
          gap={1}
          marginTop={5}
          padding={0}
          style={{ listStyleType: "none" }}
        >
          {project.tags.map((x) => (
            <ButtonLink
              key={x.id}
              href={`/tags/${x.id}`}
              variant="tertiary"
              size="medium"
            >
              {x.title}
            </ButtonLink>
          ))}
        </Box>
      </PageLayout.Header>
      {project.abstract && (
        <HomeRow background="white">
          <HomeRow.Title>Overview</HomeRow.Title>
          {renderRichToReact(project.abstract)}
        </HomeRow>
      )}
      {Boolean(project.primaryCollaborators.length) && (
        <HomeRow background="white">
          <HomeRow.Title>Collaborators</HomeRow.Title>
          <CollabList collabList={project.primaryCollaborators} />
        </HomeRow>
      )}
      {Boolean(project.activeAssistants.length) && (
        <HomeRow background="white">
          <HomeRow.Title>Active Research Assitants</HomeRow.Title>
          <CollabList collabList={project.activeAssistants} />
        </HomeRow>
      )}
      {hasPublications && (
        <HomeRow background="white">
          <HomeRow.Title>Publications</HomeRow.Title>
          <PageLayout.List>
            <PublicationList publicationList={project.publicationList!} />
          </PageLayout.List>
        </HomeRow>
      )}
      {hasGrants && (
        <HomeRow background="surface-01">
          <HomeRow.Title>Grants & Awards</HomeRow.Title>
          <PageLayout.List>
            <GrantList grantList={project.grantList!} showProjects={false} />
          </PageLayout.List>
        </HomeRow>
      )}
      {hasPresentations && (
        <HomeRow background="white">
          <HomeRow.Title>Presentations</HomeRow.Title>
          <PageLayout.List>
            {project.presentationList!.map((e) => (
              <Article
                key={e.id}
                image={e.img}
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
          </PageLayout.List>
        </HomeRow>
      )}
      {Boolean(project.postList.length) && (
        <HomeRow background="white">
          <HomeRow.Title>Related Posts</HomeRow.Title>
          <PageLayout.List>
            {project.postList.map((e) => (
              <Article
                key={e.id}
                image={e.img}
                title={e.title}
                summary={e.description}
                href={`/posts/${e.id}`}
                tag={e.tags.length ? e.tags[0].title : undefined}
              />
            ))}
          </PageLayout.List>
        </HomeRow>
      )}
      {Boolean(project.pastAssistants.length) && (
        <HomeRow background="white">
          <HomeRow.Title>Past Research Assitants</HomeRow.Title>
          <CollabList collabList={project.pastAssistants} />
        </HomeRow>
      )}
    </PageLayout>
  );
};

export default Page;
