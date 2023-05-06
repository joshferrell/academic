import { EntryFieldTypes, createClient } from "contentful";
// @ts-ignore
import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";
import { ArrowRight } from "lucide-react";

import { Box } from "~/widgets/box";
import HomeRow from "~/widgets/home-row";
import Card from "~/widgets/card";
import { ButtonLink } from "~/widgets/button-link";
import Link from "next/link";
import { vars } from "~/theme.css";

type Publication = {
  id: string;
  title: string;
  citationHTML: string;
};

const fetchPublications = async (): Promise<{
  [category: string]: Publication[];
}> => {
  plugins.config.get("@bibtex");
  plugins.config.get("@csl");
  const client = createClient({
    accessToken: process.env.CONTENFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
  });

  const entries = await client.getEntries<{
    contentTypeId: "publication";
    fields: {
      feature: EntryFieldTypes.Boolean;
      publicationType: string;
      bibtex: string;
      title: string;
    };
  }>({
    content_type: "publication",
    locale: "en-US",
    "fields.feature": true,
  });

  return entries.items.reduce<{ [category: string]: Publication[] }>(
    (acc, curr) => {
      const category = curr.fields.publicationType as string;
      const bibtex = curr.fields.bibtex as string;
      const citation = bibtex.split("\n").join("");
      const cite = new Cite(citation, { forceType: "@bibtex/text" })
        .format("bibliography", {
          format: "html",
          template: "apa",
          lang: "en-US",
        })
        .replace(
          curr.fields.title,
          `<a href="/publications/${curr.sys.id}">${curr.fields.title}</a>`
        );
      const publication: Publication = {
        citationHTML: cite,
        title: curr.fields.title as string,
        id: curr.sys.id,
      };
      if (!acc[category]) {
        return Object.assign(acc, { [category]: [publication] });
      } else {
        return Object.assign(acc, {
          [category]: acc[category].concat([publication]),
        });
      }
    },
    {}
  );
};

type Grant = {
  id: string;
  title: string;
  description: string;
  yearAwarded: string;
  awardLink?: string;
};

const fetchGrants = async (): Promise<Grant[]> => {
  const client = createClient({
    accessToken: process.env.CONTENFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
  });

  const entries = await client.getEntries({
    content_type: "grants-and-awards",
    locale: "en-US",
  });

  return entries.items
    .map(
      (grant) =>
        ({
          title: grant.fields.title,
          description: grant.fields.descriptionGrantedBy,
          yearAwarded: grant.fields.yearAwarded,
          awardLink: grant.fields.awardLink,
          id: grant.sys.id,
        } as Grant)
    )
    .sort(
      (a, b) => Number.parseInt(a.yearAwarded) - Number.parseInt(b.yearAwarded)
    )
    .slice(0, 5);
};

const Publications = async () => {
  const [publications, grants] = await Promise.all([
    fetchPublications(),
    fetchGrants(),
  ]);

  return (
    <HomeRow background="white">
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: vars.space[3],
        }}
      >
        <Box flex={["full", "full", 2]}>
          <Box as="h2" headingStyle="title" marginTop={0}>
            Publications
          </Box>
          <Box marginBottom={3}>
            {Object.entries(publications).map(([category, publications]) => (
              <section key={category}>
                <Box
                  as="h3"
                  headingStyle="subtitle"
                  style={{ textTransform: "capitalize" }}
                >
                  {category}
                </Box>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: vars.space[2],
                  }}
                >
                  {publications.map((entry) => (
                    <Box
                      textStyle="large"
                      dangerouslySetInnerHTML={{ __html: entry.citationHTML }}
                      key={entry.id}
                    />
                  ))}
                </div>
              </section>
            ))}
          </Box>
          <HomeRow.CTA href="/publications">View all publications</HomeRow.CTA>
        </Box>
        {Boolean(grants.length) && (
          <Card flex={["full", "full", 1]}>
            <Card.Title as="h2" title="Grants & Awards" />
            <ul
              style={{
                padding: 0,
                listStyleType: "none",
                display: "flex",
                flexDirection: "column",
                gap: vars.space["0.5"],
              }}
            >
              {grants.map((x) => (
                <li key={x.id}>
                  <div style={{ fontWeight: 600 }}>{x.title}</div>
                  <div>{x.description}</div>
                  <Box textStyle="small" color="highlight">
                    {x.yearAwarded}
                  </Box>
                </li>
              ))}
            </ul>
            <ButtonLink href="/grants" width="full" marginTop={1}>
              View all Grants and Awards
            </ButtonLink>
          </Card>
        )}
      </div>
    </HomeRow>
  );
};

export default Publications;
