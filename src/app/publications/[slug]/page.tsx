import { BookMinusIcon, CalendarIcon } from "lucide-react";
import type { Metadata } from "next";

import { fetchPublication, fetchPublicationList } from "~/actions/publication";
import { Box } from "~/widgets/box";
import { ButtonLink } from "~/widgets/button-link";
import Card from "~/widgets/card";
import HomeRow from "~/widgets/home-row";

import PageLayout from "~/widgets/layout";
import { RelatedProjects } from "~/widgets/project-card";
import renderRichToReact from "~/widgets/rich-text";

type PropTypes = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const publications = await fetchPublicationList();
  if (!Object.keys(publications).length) return [];
  return Object.values(publications).reduce<{ slug: string }[]>(
    (acc, pubList) => {
      const slugList = pubList.map((x) => ({ slug: x.id }));
      return acc.concat(slugList);
    },
    []
  );
};

export const generateMetadata = async ({
  params,
}: PropTypes): Promise<Metadata> => {
  const slug = params?.slug || "";
  const publication = await fetchPublication(slug);
  if (!publication) return {};

  const ogImage = `${process.env.HOST_NAME}/og?title=${encodeURIComponent(
    publication.title
  )}&subtitle=${encodeURIComponent(
    publication.tags.length ? publication.tags[0].title : ""
  )}`;

  const url = `${process.env.HOST_NAME}/publications/${slug}`;

  return {
    title: `${process.env.STUDENT_NAME} | ${publication.title}`,
    twitter: {
      card: "summary_large_image",
      title: publication.title,
      images: {
        url: ogImage,
        alt: "",
      },
    },
    openGraph: {
      title: publication.title,
      type: "article",
      url,
      locale: "en-US",
      images: [{ url: ogImage, alt: "", width: 1200, height: 630 }],
    },
  };
};

const Page = async ({ params }: PropTypes) => {
  const slug = params?.slug || "";
  const publication = await fetchPublication(slug);

  return (
    <PageLayout>
      <PageLayout.Header
        title={publication.title}
        subtitle={publication.authors.join(", ")}
      />
      <PageLayout.Container>
        <PageLayout.Row>
          <PageLayout.Sidebar>
            <Card>
              <Card.Title title={publication.publicationType} />
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={0.5}
                marginTop={1}
              >
                {publication.tags.map((x) => (
                  <ButtonLink
                    key={x.id}
                    variant="secondary"
                    size="small"
                    href={`/tags/${x.id}`}
                  >
                    {x.title}
                  </ButtonLink>
                ))}
              </Box>
              <Box
                as="hr"
                marginTop={1}
                marginBottom={2}
                color="soft"
                style={{ border: "none", borderTop: "1px solid" }}
              />
              <PageLayout.List>
                {publication.publication && (
                  <Box
                    display="grid"
                    gap={0.5}
                    alignItems="flex-start"
                    style={{ gridTemplateColumns: "24px 1fr" }}
                  >
                    <BookMinusIcon size={20} style={{ marginTop: "2px" }} />
                    {publication.publication}
                  </Box>
                )}
                {publication.date && (
                  <Box
                    display="grid"
                    gap={0.5}
                    alignItems="flex-start"
                    style={{ gridTemplateColumns: "24px 1fr" }}
                  >
                    <CalendarIcon size={20} style={{ marginTop: "2px" }} />
                    {publication.date}
                  </Box>
                )}
                <Box display="flex" gap={1} alignItems="flex-start">
                  <div>Status:</div>
                  <Box
                    display="inline-block"
                    paddingX={1}
                    bg="surface-01"
                    borderRadius="lg"
                  >
                    {publication.status}
                  </Box>
                </Box>
              </PageLayout.List>
              {publication.link && (
                <ButtonLink href={publication.link} marginTop={3} width="full">
                  View publication
                </ButtonLink>
              )}
            </Card>
          </PageLayout.Sidebar>
          <PageLayout.MainColumn>
            {publication.abstract && (
              <Box as="section" marginBottom={3}>
                <HomeRow.Title>Abstract</HomeRow.Title>
                {renderRichToReact(publication.abstract)}
              </Box>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: publication.citationHTML }}
            />
          </PageLayout.MainColumn>
        </PageLayout.Row>
        <RelatedProjects projectList={publication.projectList} />
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Page;
