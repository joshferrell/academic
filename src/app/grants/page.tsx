import { fetchGrantList, sortGrants, type Grant } from "~/actions";
import GrantList from "~/views/grant-list";
import PageLayout from "~/widgets/layout";

const fetchGrants = async (): Promise<{ [year: string]: Grant[] }> => {
  const grantList = await fetchGrantList(200);
  return sortGrants(grantList);
};

export const metadata = {
  title: `${process.env.STUDENT_NAME} | Grants and Awards`,
  description: `Discover grants and awards received by ${process.env.STUDENT_NAME}. Explore accomplishments and the impact they've made in their respective field.`,
};

const Projects = async () => {
  const grantList = await fetchGrants();

  return (
    <PageLayout>
      <PageLayout.Header title="Grants, Fellowships, and Awards" />
      <PageLayout.Container>
        <GrantList grantList={grantList} showProjects={true} />
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Projects;
