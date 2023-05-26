import type { Metadata } from "next";
import { fetchPost, fetchPostList } from "~/actions";

import PageLayout from "~/widgets/layout";
import HomeRow from "~/widgets/home-row";
import { Box } from "~/widgets/box";
import { ButtonLink } from "~/widgets/button-link";
import renderRichToReact from "~/widgets/rich-text";
import { RelatedProjects } from "~/widgets/project-card";

type PropTypes = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const postList = await fetchPostList(100);
  return postList.map(({ id }) => ({ slug: id }));
};

export const generateMetadata = async ({
  params,
}: PropTypes): Promise<Metadata> => {
  const slug = params?.slug || "";
  const presentation = await fetchPost(slug);
  if (!presentation) return {};

  const ogImage = `${process.env.HOST_NAME}/og?title=${encodeURIComponent(
    presentation.title
  )}&subtitle=${encodeURIComponent(
    presentation.tags.length ? presentation.tags[0].title : ""
  )}`;

  const url = `${process.env.HOST_NAME}/posts/${slug}`;

  return {
    title: `${process.env.STUDENT_NAME} | ${presentation.title}`,
    alternates: {
      canonical: url,
    },
    description: presentation.description,
    twitter: {
      card: "summary_large_image",
      title: presentation.title,
      description: presentation.description,
      images: {
        url: ogImage,
        alt: "",
      },
    },
    openGraph: {
      title: presentation.title,
      type: "article",
      description: presentation.description,
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
  const post = await fetchPost(slug);

  return (
    <PageLayout>
      <PageLayout.Header title={post.title} img={post.img}>
        <Box
          as="ul"
          display="flex"
          flexWrap="wrap"
          gap={1}
          marginTop={5}
          padding={0}
          style={{ listStyleType: "none" }}
        >
          {post.tags.map((x) => (
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
      <PageLayout.Container>
        {renderRichToReact(post.content)}
        <RelatedProjects projectList={post.projectList} />
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Page;
