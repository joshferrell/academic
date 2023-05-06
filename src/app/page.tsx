import { createClient, type EntryFieldTypes } from "contentful";
import { Metadata } from "next";

import Profile from "~/views/home/profile";
import ProjectList from "~/views/home/project-list";
import Publications from "~/views/home/publication";
import Presentation from "~/views/home/presentation-list";

type Student = {
  name: string;
  role: string;
  email: string;
  profilePhoto: string;
  social: { icon: string; link: string; title: string }[];
  bio: EntryFieldTypes.RichText;
  cv?: string;
  briefBio: string;
  cvContent: EntryFieldTypes.RichText;
};

const fetchStudent = async (): Promise<Student> => {
  const client = createClient({
    accessToken: process.env.CONTENFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
  });

  const entries = await client.getEntries({
    content_type: "student",
    locale: "en-US",
  });

  if (!entries.items) throw new Error("No student information was found");

  const [student] = entries.items;

  return {
    name: student.fields.name,
    role: student.fields.role,
    email: student.fields.email,

    // @ts-ignore typing here with contentful is strange with assets
    profilePhoto: student.fields.profilePhoto.fields.file.url,
    // @ts-ignore typing here with contentful is strange with assets
    cv: student.fields.cv?.fields.file.url,
    cvContent: student.fields.cvContent,
    social: student.fields.social,
    bio: student.fields.bio,
    briefBio: student.fields.briefBio,
  } as Student;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const student = await fetchStudent();
  return {
    title: student.name,
    description: student.briefBio,
  };
};

const Home = () => (
  <main>
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
