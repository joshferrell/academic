import { fetchTags } from "~/actions/tags";
import { Box } from "~/widgets/box";

import PageLayout from "~/widgets/layout";

const Page = async () => {
  const tagList = await fetchTags();

  return (
    <PageLayout>
      <PageLayout.Header
        title="Tags"
        subtitle="Explore a curated collection of topics and interests. Our tags page offers a comprehensive overview of content categories, making it easier for readers to discover relevant articles, stories, and themes."
      />
      <PageLayout.Container>
        <Box
          as="ul"
          display="flex"
          flexDirection="column"
          gap={2}
          paddingX={[0.5, 0]}
          style={{ listStyle: "none" }}
        >
          {tagList.map((x) => (
            <li key={x.id}>
              <a href={`/tags/${x.id}`}>
                <Box headingStyle="subtitle">{x.title}</Box>
                {x.description && <Box textStyle="large">{x.description}</Box>}
              </a>
            </li>
          ))}
        </Box>
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Page;
