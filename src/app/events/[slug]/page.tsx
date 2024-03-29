import type { Metadata } from "next";
import {
  fetchPresentation,
  fetchPresentationList,
} from "~/actions/presentation";

import PageLayout from "~/widgets/layout";
import HomeRow from "~/widgets/home-row";
import renderRichToReact from "~/widgets/rich-text";
import Card, { type DefinitionList } from "~/widgets/card";
import { ButtonLink } from "~/widgets/button-link";
import { Box } from "~/widgets/box";
import { CalendarIcon, MapPinIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { RelatedProjects } from "~/widgets/project-card";
import { EventLink } from "~/widgets/event-link";

type PropTypes = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const presentationList = await fetchPresentationList(100);
  return presentationList.map(({ id }) => ({ slug: id }));
};

export const generateMetadata = async ({
  params,
}: PropTypes): Promise<Metadata> => {
  const slug = params?.slug || "";
  const presentation = await fetchPresentation(slug);
  if (!presentation) return {};

  const ogImage = `/og?title=${encodeURIComponent(
    presentation.title
  )}&subtitle=${encodeURIComponent(
    presentation.tags.length ? presentation.tags[0].title : ""
  )}`;

  const url = `/events/${slug}`;

  return {
    title: `${process.env.STUDENT_NAME} | ${presentation.title}`,
    alternates: {
      canonical: url,
    },
    description: presentation.briefSummary,
    twitter: {
      card: "summary_large_image",
      title: presentation.title,
      description: presentation.briefSummary,
      images: {
        url: ogImage,
        alt: "",
      },
    },
    openGraph: {
      title: presentation.title,
      type: "article",
      description: presentation.briefSummary,
      url,
      locale: "en-US",
      images: [
        {
          url: ogImage,
          alt: "",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

const Page = async ({ params }: PropTypes) => {
  const slug = params?.slug || "";
  const event = await fetchPresentation(slug);
  const now = new Date();
  const isFutureEvent = new Date(event.date) > now;

  const definitionList: DefinitionList[] = [
    { term: "Time", icon: "calendar", definition: { value: event.time } },
  ];

  if (event.location)
    definitionList.push({
      term: "Location",
      icon: "map-pin",
      definition: { value: event.location },
    });

  if (event.recording)
    definitionList.push({
      term: "Recording",
      icon: "video",
      definition: { value: "View Recording", href: event.recording },
    });

  return (
    <PageLayout>
      <PageLayout.Header
        title={event.title}
        img={event.img}
        subtitle={event.presenters.join(", ")}
      />
      <PageLayout.Container>
        <PageLayout.Row>
          <PageLayout.MainColumn>
            <HomeRow.Title>Abstract</HomeRow.Title>
            {renderRichToReact(event.description)}
          </PageLayout.MainColumn>
          <PageLayout.Sidebar>
            <Card>
              <Card.Title title="Event Info" />
              <Box textStyle="large" marginBottom={1}>
                {event.event.url ? (
                  <Link href={event.event.url}>{event.event.title}</Link>
                ) : (
                  event.event.title
                )}
              </Box>
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={0.5}>
                {event.tags.map((x) => (
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
                marginTop={2}
                marginBottom={3}
                color="soft"
                style={{ border: "none", borderTop: "1px solid" }}
              />
              <Card.DefinitionList definitions={definitionList} />
              {isFutureEvent && (
                <EventLink marginTop={3} width="full" event={event}>
                  Add to Calendar
                </EventLink>
              )}
            </Card>
          </PageLayout.Sidebar>
        </PageLayout.Row>
        <RelatedProjects projectList={event.projectList} />
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Page;
