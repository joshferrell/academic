import { type Grant } from "~/actions/types";

import { Box } from "~/widgets/box";
import { ButtonLink } from "~/widgets/button-link";
import Category from "~/widgets/category";

type PropTypes = {
  grantList: { [year: string]: Grant[] };
  showProjects?: boolean;
};

const GrantList = ({ grantList, showProjects = false }: PropTypes) => (
  <Category.List>
    {Object.entries(grantList)
      .sort((a, b) => Number.parseInt(b[0]) - Number.parseInt(a[0]))
      .map(([year, grants]) => (
        <Category
          title={year}
          key={year}
          level={showProjects ? "primary" : "secondary"}
        >
          <ul
            style={{
              padding: 0,
              margin: 0,
              listStyleType: "none",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {grants.map((x) => (
              <li key={x.id}>
                <Box
                  id={x.id}
                  as={showProjects ? "h3" : "h4"}
                  margin={0}
                  headingStyle="subtitle"
                >
                  {x.awardLink ? (
                    <a href={x.awardLink} rel="noreferrer">
                      {x.title}
                    </a>
                  ) : (
                    x.title
                  )}
                </Box>
                <Box marginBottom={0.25} textStyle="large">
                  {x.description}
                </Box>
                <Box textStyle="small" color="highlight">
                  {x.yearAwarded}
                  {Boolean(x.endYear) && <span>&nbsp;-&nbsp;{x.endYear}</span>}
                </Box>
                {x.project && showProjects && (
                  <ButtonLink
                    marginTop={0.5}
                    href={`/projects/${x.project.id}`}
                    size="small"
                    variant="secondary"
                  >
                    Project
                  </ButtonLink>
                )}
              </li>
            ))}
          </ul>
        </Category>
      ))}
  </Category.List>
);

export default GrantList;
