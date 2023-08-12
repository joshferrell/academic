import { fetchTeaching } from "~/actions/teaching";
import { Box } from "~/widgets/box";
import { CollabList } from "~/widgets/collab-list";

import PageLayout from "~/widgets/layout";
import renderRichToReact from "~/widgets/rich-text";

export const metadata = {
  title: `${process.env.STUDENT_NAME} | Teaching`,
  description: `Browse ${process.env.STUDENT_NAME}'s collection of teaching experience.`,
};

const Teaching = async () => {
  const teaching = await fetchTeaching();

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
