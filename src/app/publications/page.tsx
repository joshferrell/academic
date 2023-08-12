import { fetchPublicationList } from "~/actions/publication";

import PageLayout from "~/widgets/layout";
import PublicationList from "~/views/publication-list";

export const metadata = {
  title: `${process.env.STUDENT_NAME} | Publications`,
  description: `Browse ${process.env.STUDENT_NAME}'s collection of academic publications.`,
};

const Publications = async () => {
  const publications = await fetchPublicationList();

  return (
    <PageLayout>
      <PageLayout.Header title="Publications" />
      <PageLayout.Container>
        <PublicationList publicationList={publications} showProjects={true} />
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Publications;
