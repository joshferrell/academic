import Link from "next/link";
import Image from "next/image";

import { Project } from "~/actions/types";

import { Box } from "../box";
import * as styles from "./styles.css";
import HomeRow from "../home-row";
import { Article } from "../article";

type PropTypes = Omit<React.HTMLProps<HTMLDivElement>, "size"> & {
  project: Project;
  size?: "medium" | "large";
};

export const ProjectCard = ({
  project,
  size = "medium",
  style,
  ...htmlAttributes
}: PropTypes) => {
  return (
    <article
      className={styles.Article({ size })}
      style={{ flex: "25%", ...style }}
      {...htmlAttributes}
    >
      <Image
        className={styles.Image}
        src={project.img.src}
        alt={project.img.alt}
        fill={true}
      />
      <div className={styles.Gradient({ size })} />
      <div />
      <Box textStyle="base" className={styles.Subtitle}>
        {project.tags.length ? project.tags[0].title : "Project"}
      </Box>
      <Box color="inverted">
        <Link href={`/projects/${project.id}`} className={styles.Link}>
          <span className={styles.LinkSpan} />
          {project.name}
        </Link>
      </Box>
    </article>
  );
};

type RelatedPropTypes = {
  projectList?: Project[];
};

export const RelatedProjects = ({ projectList }: RelatedPropTypes) => {
  if (!projectList || !projectList.length) return null;
  const [project] = projectList;

  return (
    <Box marginTop={3}>
      <HomeRow background="surface-01" prominance="center">
        <HomeRow.Title>Related Projects</HomeRow.Title>
        {projectList.length > 1 ? (
          <Box
            display={["flex"]}
            flexDirection={["column", "row"]}
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            marginBottom={3}
            style={{ gridTemplateColumns: "repeat(3, 1fr)", width: "100%" }}
          >
            {projectList.map((x) => (
              <ProjectCard project={x} key={x.id} />
            ))}
          </Box>
        ) : (
          <Article
            title={project.name}
            href={`/projects/${project.id}`}
            summary={project.summary}
            image={project.img}
            cta="View Project"
          />
        )}
      </HomeRow>
    </Box>
  );
};
