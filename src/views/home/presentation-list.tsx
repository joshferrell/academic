import { EntryFieldTypes, createClient } from "contentful";
import { Article } from "~/widgets/article";
import HomeRow from "~/widgets/home-row";

type Presentation = {
  id: string;
  title: string;
  briefSummary: string;
  date: string;
  description: EntryFieldTypes.RichText;
  tags: { title: string; id: string }[];
  event: {
    title: string;
    url?: string;
  };
};

const fetchPresentation = async (): Promise<Presentation[]> => {
  const client = createClient({
    accessToken: process.env.CONTENFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
  });

  const entries = await client.getEntries({
    content_type: "event",
    locale: "en-US",
  });

  if (!entries.items) return [];

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return entries.items.map(
    (x) =>
      ({
        id: x.sys.id,
        title: x.fields.title as string,
        briefSummary: x.fields.summary,
        date: new Date(x.fields.date as string).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        description: x.fields.description,
        tags: (x.fields.tags as any).map((x: any) => ({
          id: x.sys.id,
          title: x.fields.title,
        })),
        event: {
          title: x.fields.eventName,
          url: x.fields.eventUrl,
        },
      } as Presentation)
  );
};

const Presentation = async () => {
  const presentationList = await fetchPresentation();

  if (!presentationList.length) return null;

  return (
    <HomeRow prominance="center" background="white">
      <HomeRow.Title>Presentations</HomeRow.Title>
      {presentationList.map((e) => (
        <Article
          key={e.id}
          title={e.title}
          summary={e.briefSummary}
          date={e.date}
          href={`/event/${e.id}`}
        />
      ))}
      <HomeRow.CTA href="/event">View all presentations</HomeRow.CTA>
    </HomeRow>
  );
};

export default Presentation;
