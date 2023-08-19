import { fetchPresentationList } from "~/actions/presentation";

import { Article } from "~/widgets/article";
import { Box } from "~/widgets/box";
import HomeRow from "~/widgets/home-row";

const Presentation = async () => {
  const presentationList = await fetchPresentationList(4);

  if (!presentationList.length) return null;

  return (
    <HomeRow prominance="center" background="white">
      <HomeRow.Title>Presentations</HomeRow.Title>
      <Box display="flex" gap={2} flexDirection="column">
        {presentationList.map((e) => (
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
      <HomeRow.CTA href="/events">View all presentations</HomeRow.CTA>
    </HomeRow>
  );
};

export default Presentation;
