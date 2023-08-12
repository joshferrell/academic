import type { Publication } from "~/actions/types";

import Category from "~/widgets/category";
import { Box } from "~/widgets/box";

type PropTypes = {
  publicationList: { [category: string]: Publication[] };
  showProjects?: boolean;
};

const PublicationList = ({
  publicationList,
  showProjects = false,
}: PropTypes) => (
  <Category.List>
    {Object.entries(publicationList).map(([category, pubs]) => (
      <Category
        size="large"
        title={category}
        key={category}
        level={showProjects ? "primary" : "secondary"}
      >
        <Box
          as="ul"
          display="flex"
          flexDirection="column"
          gap={3}
          padding={0}
          margin={0}
          style={{ listStyleType: "none" }}
        >
          {pubs.map((x) => (
            <Box as="li" textStyle="large" key={x.id}>
              <span
                className="citation-item"
                dangerouslySetInnerHTML={{ __html: x.citationHTML }}
              />
              {x.status !== "Published" && x.status !== "In Preparation" && (
                <span>[{x.status}]</span>
              )}
            </Box>
          ))}
        </Box>
      </Category>
    ))}
  </Category.List>
);

export default PublicationList;
