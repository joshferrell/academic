import { createClient, type EntryFieldTypes } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createElement } from "react";

import { Box } from "~/widgets/box";
import { ButtonLink } from "~/widgets/button-link";
import HomeRow from "~/widgets/home-row";
import { SrOnly } from "~/widgets/sr-only";
import { vars } from "~/theme.css";
import { SocialLink } from "~/widgets/icon-link";

type Student = {
  name: string;
  role: string;
  email: string;
  profilePhoto: string;
  social: { icon: string; link: string; title: string }[];
  bio: EntryFieldTypes.RichText;
  cv?: string;
  briefBio: string;
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
    social: student.fields.social,
    bio: student.fields.bio,
    briefBio: student.fields.briefBio,
  } as Student;
};

const Profile = async () => {
  const student = await fetchStudent();

  return (
    <HomeRow prominance="focus" background="primary">
      <Box
        display={["flex", "flex", "grid"]}
        style={{
          flexFlow: "column nowrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: vars.space[2],
          gridTemplateColumns: "200px 1fr",
        }}
      >
        <img
          alt=""
          aria-hidden={true}
          src={student.profilePhoto}
          width={200}
          height={200}
          style={{ borderRadius: vars.radius.sm }}
        />
        <div>
          <Box textStyle="large" color="soft">
            {student.role}
          </Box>
          <Box
            as="h1"
            headingStyle={["superMobile", "super"]}
            margin="none"
            paddingBottom={0.5}
            paddingTop={0.25}
          >
            {student.name}
          </Box>
          <Box headingStyle="title" marginBottom={1}>
            {student.briefBio}
          </Box>
          <ul
            style={{
              display: "flex",
              gap: vars.space[1],
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {student.social.map((social) => (
              <li key={social.title}>
                <SocialLink {...social} />
              </li>
            ))}
          </ul>
        </div>
      </Box>
      <Box as="p" textStyle="super" marginTop={4} marginBottom={5}>
        {documentToReactComponents(student.bio as any)}
      </Box>
      {student.cv && (
        <ButtonLink isExternal={true} href={student.cv}>
          Download CV
        </ButtonLink>
      )}
    </HomeRow>
  );
};

export default Profile;
