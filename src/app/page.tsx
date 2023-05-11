import Profile from "~/views/home/profile";
import ProjectList from "~/views/home/project-list";
import Publications from "~/views/home/publication";
import Presentation from "~/views/home/presentation-list";

const Home = () => (
  <main id="skip">
    {/* @ts-ignore RSC expected error */}
    <Profile />
    {/* @ts-ignore RSC expected error */}
    <Publications />
    {/* @ts-ignore RSC expected error */}
    <ProjectList />
    {/* @ts-ignore RSC expected error */}
    <Presentation />
  </main>
);

export default Home;
