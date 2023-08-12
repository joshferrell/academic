import { fetchStudent } from "~/actions/student";

import Image from "next/image";
import { FileTextIcon, GraduationCapIcon } from "lucide-react";

import PageLayout from "~/widgets/layout";
import { Box } from "~/widgets/box";
import renderRichToReact from "~/widgets/rich-text";
import { ButtonLink } from "~/widgets/button-link";
import { SocialIcon } from "~/widgets/icon-link";

export const metadata = {
  title: `${process.env.STUDENT_NAME} | About`,
};

const Page = async () => {
  const student = await fetchStudent();

  return (
    <PageLayout>
      <PageLayout.Header title={student.name} subtitle={student.role} />
      <PageLayout.Container>
        <PageLayout.Row>
          <PageLayout.Sidebar>
            <Image
              src={student.profilePhoto}
              alt=""
              aria-hidden
              width={300}
              height={300}
              style={{ borderRadius: "2rem" }}
            />
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              padding={0}
              marginTop={2}
              marginX={0}
              style={{ listStyleType: "none" }}
            >
              {student.social.map((social) => (
                <li key={social.title}>
                  <Box
                    as="a"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    href={social.link}
                    rel="noreferrer"
                  >
                    <SocialIcon color="soft" icon={social.icon} />
                    {social.description}
                  </Box>
                </li>
              ))}
            </Box>
            <section>
              <Box as="h2" headingStyle="subtitle" marginBottom={0.5}>
                Interests
              </Box>
              <ul style={{ paddingLeft: "1.75rem" }}>
                {student.interests?.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>
          </PageLayout.Sidebar>
          <PageLayout.MainColumn>
            {renderRichToReact(student.bio)}
            <div>
              {student.cv && (
                <ButtonLink
                  variant="secondary"
                  href={student.cv}
                  marginTop={1}
                  marginBottom={2}
                >
                  <FileTextIcon
                    size={20}
                    style={{ marginRight: ".5rem", marginBottom: "-3px" }}
                  />
                  View CV
                </ButtonLink>
              )}
            </div>
            <Box display="flex" gap={4}>
              <section style={{ flex: "50%" }}>
                <Box as="h2" headingStyle="title" marginBottom={0.5}>
                  Education
                </Box>
                <Box
                  as="ul"
                  padding={0}
                  marginTop={2}
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  style={{ listStyleType: "none" }}
                >
                  {student.education?.map((x) => (
                    <li
                      key={x.title}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "30px 1fr",
                        gap: "1rem",
                      }}
                    >
                      <GraduationCapIcon style={{ marginTop: "4px" }} />
                      <div>
                        <Box headingStyle="subtitle">{x.title}</Box>
                        <Box textStyle="large">{x.university}</Box>
                      </div>
                    </li>
                  ))}
                </Box>
              </section>
            </Box>
          </PageLayout.MainColumn>
        </PageLayout.Row>
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Page;
