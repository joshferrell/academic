import { fetchPresentationList, type Presentation } from "~/actions";

import PageLayout from "~/widgets/layout";
import { Box } from "~/widgets/box";
import { Article } from "~/widgets/article";

type PresentationObj = {
  upcoming: Presentation[];
  past: Presentation[];
};

export const metadata = {
  title: `${process.env.STUDENT_NAME} | Events`,
  description: `Find upcoming public speaking and conference presentation events by an experienced speaker. Learn from their expertise and engage with like-minded individuals in your field of interest. Discover valuable insights and gain new perspectives through engaging with our speaker at their events.`,
};

const sortPresentations = async (): Promise<PresentationObj> => {
  const presentationList = await fetchPresentationList(200);
  const now = new Date();

  return presentationList.reduce<PresentationObj>(
    (acc, curr) => {
      if (new Date(curr.date) < now) {
        return Object.assign(acc, { past: acc.past.concat([curr]) });
      } else {
        return Object.assign(acc, { upcoming: acc.upcoming.concat([curr]) });
      }
    },
    { upcoming: [], past: [] }
  );
};

const Presentations = async () => {
  const { upcoming, past } = await sortPresentations();

  return (
    <PageLayout>
      <PageLayout.Header title="Recent and Upcoming Events" />
      <PageLayout.Container>
        <PageLayout.List>
          {Boolean(upcoming.length) && (
            <section>
              <Box headingStyle="title" marginBottom={3}>
                Upcoming
              </Box>
              <PageLayout.List>
                {upcoming.map((e) => (
                  <Article
                    key={e.id}
                    image={e.img}
                    title={e.title}
                    summary={e.briefSummary}
                    date={e.date}
                    href={`/events/${e.id}`}
                  />
                ))}
              </PageLayout.List>
            </section>
          )}
          {Boolean(past.length) && (
            <section>
              <Box headingStyle="title" marginBottom={3}>
                Past Events
              </Box>
              <PageLayout.List>
                {past.map((e) => (
                  <Article
                    key={e.id}
                    title={e.title}
                    summary={e.briefSummary}
                    date={e.date}
                    image={e.img}
                    href={`/events/${e.id}`}
                  />
                ))}
              </PageLayout.List>
            </section>
          )}
        </PageLayout.List>
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Presentations;
