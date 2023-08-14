import type { Metadata } from "next";
import { fetchCourse, fetchCourseList } from "~/actions/courses";

import PageLayout from "~/widgets/layout";
import renderRichToReact from "~/widgets/rich-text";
import Card, { type DefinitionList } from "~/widgets/card";
import { Box } from "~/widgets/box";
import { ButtonLink } from "~/widgets/button-link";
import { Feedback } from "~/widgets/feedback";

type PropTypes = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const courseList = await fetchCourseList(100);
  return courseList.map(({ id }) => ({ slug: id }));
};

export const generateMetadata = async ({
  params,
}: PropTypes): Promise<Metadata> => {
  const slug = params?.slug || "";
  const course = await fetchCourse(slug);
  if (!course) return {};

  const url = `${process.env.HOST_NAME}/courses/${slug}`;

  const ogImage = `${process.env.HOST_NAME}/og?title=${encodeURIComponent(
    course.title
  )}&subtitle=${encodeURIComponent(course.time)}`;

  return {
    title: `${process.env.STUDENT_NAME} | ${course.title}`,
    alternates: {
      canonical: url,
    },
    description: course.summary,
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.summary,
      images: {
        url: ogImage,
        alt: "",
      },
    },
    openGraph: {
      title: course.title,
      type: "article",
      description: course.summary,
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
  const slug = params?.slug || "slug";
  const course = await fetchCourse(slug);

  const definitionList: DefinitionList[] = [
    {
      term: "Role",
      icon: "user",
      definition: { value: course.role },
    },
    {
      term: "Term",
      icon: "calendar",
      definition: { value: course.time },
    },
    {
      term: "Location",
      icon: "map-pin",
      definition: { value: course.location },
    },
  ];

  if (course.size)
    definitionList.push({
      term: "Class Size",
      icon: "users",
      definition: { value: course.size.toString() },
    });

  return (
    <PageLayout>
      <PageLayout.Header title={course.title} subtitle={course.courseTag} />
      <PageLayout.Container>
        <PageLayout.Row>
          <PageLayout.Sidebar>
            <Card>
              <Card.Title title="Course Details" marginBottom={2} />
              <Card.DefinitionList definitions={definitionList} />
              <Box as="hr" marginTop={2} marginBottom={3} />
              <ButtonLink width="full" isExternal href={course.syllabus}>
                Syllabus
              </ButtonLink>
            </Card>
          </PageLayout.Sidebar>
          <PageLayout.MainColumn>
            {course.description && (
              <Box as="section" marginBottom={6}>
                {renderRichToReact(course.description)}
              </Box>
            )}
          </PageLayout.MainColumn>
        </PageLayout.Row>
        {course.feedback && (
          <section>
            <Box
              as="h2"
              headingStyle="title"
              marginBottom={4}
              style={{ textAlign: "center" }}
            >
              Student Feedback
            </Box>
            <Box
              display="flex"
              flexDirection={["column", "row"]}
              flexWrap="wrap"
              gap={2}
            >
              {course.feedback.map((feedback) => (
                <Feedback key={feedback.id} feedback={feedback} />
              ))}
            </Box>
          </section>
        )}
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Page;
