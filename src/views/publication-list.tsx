import type { Publication } from "~/actions/types";

import Category from "~/widgets/category";
import { PublicationListing } from "~/widgets/publication-listing";

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
        <PublicationListing publicationList={pubs} gap="large" />
      </Category>
    ))}
  </Category.List>
);

export default PublicationList;
