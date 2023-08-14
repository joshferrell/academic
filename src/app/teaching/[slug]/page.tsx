import { Metadata } from "next";
import { fetchTeaching, fetchTeachingList } from "~/actions/teaching";
import { Box } from "~/widgets/box";
import { CollabList } from "~/widgets/collab-list";

import PageLayout from "~/widgets/layout";
import renderRichToReact from "~/widgets/rich-text";

type PropTypes = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const teachingList = await fetchTeachingList();
  return teachingList.map(({ id }) => ({ slug: id }));
};

export const generateMetadata = async ({
  params,
}: PropTypes): Promise<Metadata> => {
  const slug = params?.slug || "";
  const teaching = await fetchTeaching(slug);
  if (!teaching) return {};

  const ogImage = `${process.env.HOST_NAME}/og?title=${encodeURIComponent(
    teaching.title
  )}`;

  const url = `${process.env.HOST_NAME}/teaching/${slug}`;

  return {
    title: `${process.env.STUDENT_NAME} | ${teaching.title}`,
    alternates: {
      canonical: url,
    },
    description: teaching.description,
    twitter: {
      card: "summary_large_image",
      title: teaching.title,
      description: teaching.description,
      images: {
        url: ogImage,
        alt: "",
      },
    },
    openGraph: {
      title: teaching.title,
      type: "article",
      description: teaching.description,
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

const Teaching = async ({ params }: PropTypes) => {
  const slug = params?.slug || "";
  const teaching = await fetchTeaching(slug);

  return (
    <PageLayout>
      <PageLayout.Header title={teaching.title} />
      <PageLayout.Container>
        {renderRichToReact(teaching.content)}
        {Boolean(teaching.mentees.length) && (
          <section>
            <Box as="h2" headingStyle="title" marginBottom={3}>
              Mentorship
            </Box>
            <CollabList collabList={teaching.mentees} />
          </section>
        )}
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Teaching;
