import { fetchGrantList, fetchSidebar } from "~/actions/grant";
import { fetchPublicationList } from "~/actions/publication";

import { Box } from "~/widgets/box";
import HomeRow from "~/widgets/home-row";
import Card from "~/widgets/card";
import PageLayout from "~/widgets/layout";
import { ButtonLink } from "~/widgets/button-link";
import renderRichToReact from "~/widgets/rich-text";

import { vars } from "~/theme.css";

const Publications = async () => {
  const [publications, grants, sidebar] = await Promise.all([
    fetchPublicationList(true),
    fetchGrantList(2),
    fetchSidebar(),
  ]);

  if (!Object.keys(publications).length) return null;

  return (
    <HomeRow background="white">
      <PageLayout.Row>
        <PageLayout.MainColumn>
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
        </PageLayout.MainColumn>
        <PageLayout.Sidebar>
          {sidebar ? (
            <Card>
              <Card.Title as="h2" title={sidebar.title} />
              {renderRichToReact(sidebar.content)}
              {sidebar.link && (
                <ButtonLink
                  isExternal={sidebar.link.href[0] === "/"}
                  href={sidebar.link.href}
                  width="full"
                  marginTop={1}
                >
                  {sidebar.link.text}
                </ButtonLink>
              )}
            </Card>
          ) : (
            Boolean(grants.length) && (
              <Card>
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
            )
          )}
        </PageLayout.Sidebar>
      </PageLayout.Row>
    </HomeRow>
  );
};

export default Publications;
