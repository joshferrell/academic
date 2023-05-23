import { fetchStudent } from "~/actions";

import { Box } from "~/widgets/box";
import { ButtonLink } from "~/widgets/button-link";
import HomeRow from "~/widgets/home-row";
import { SocialLink } from "~/widgets/icon-link";

import { vars } from "~/theme.css";
import Image from "next/image";
import Rainbow from "~/widgets/rainbow";

const Profile = async () => {
  const student = await fetchStudent();

  return (
    <div>
      <HomeRow prominance="focus" background="blur">
        <Box
          display={["flex", "flex", "grid"]}
          gap={2}
          marginBottom={3}
          style={{
            flexFlow: "column nowrap",
            justifyContent: "center",
            alignItems: "flex-start",
            gridTemplateColumns: "200px 1fr",
          }}
        >
          <Image
            width={200}
            height={200}
            src={student.profilePhoto}
            aria-hidden
            alt=""
            style={{ borderRadius: vars.radius.lg }}
          />
          <div>
            <Box textStyle="large" color="secondary">
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
              {student.summary}
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
                  <SocialLink size={24} variant="subtle" {...social} />
                </li>
              ))}
            </ul>
          </div>
        </Box>
        {student.briefBio
          .split("\n")
          .filter(Boolean)
          .map((x) => (
            <Box as="p" textStyle="super" key={x.slice(0, 10)}>
              {x}
            </Box>
          ))}
        {student.cv && (
          <ButtonLink marginTop={1} isExternal={true} href={student.cv}>
            Download CV
          </ButtonLink>
        )}
      </HomeRow>
      <Rainbow />
    </div>
  );
};

export default Profile;
