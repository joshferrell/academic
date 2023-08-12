import Link from "next/link";
import { Box } from "../box";
import * as styles from "./style.css";
import { ArrowRightIcon } from "lucide-react";
import { vars } from "~/theme.css";

type RowBackgrounds = "primary" | "surface-01" | "white" | "blur";
type Prominance = "normal" | "focus" | "center";

type PropTypes = {
  background: RowBackgrounds;
  prominance?: Prominance;
  children: React.ReactNode;
};

const HomeRow = ({
  background = "primary",
  prominance = "normal",
  children,
}: PropTypes) => (
  <section
    className={styles.Section({
      colors: background,
      prominance,
    })}
  >
    <div className={styles.Content({ prominance })}>{children}</div>
  </section>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <Box as="h2" headingStyle="title" marginTop="none" marginBottom={1}>
    {children}
  </Box>
);

const CTA = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <Box
    as={Link}
    textStyle="large"
    display="flex"
    href={href}
    alignItems="center"
    justifyContent="flex-start"
  >
    <div>{children}</div>
    <ArrowRightIcon
      size="1.125rem"
      style={{
        display: "inline-block",
        marginBottom: "-0.125rem",
        marginLeft: vars.space["0.25"],
        height: "1.125rem",
        width: "1.125rem",
      }}
    />
  </Box>
);

export default Object.assign(HomeRow, { Title, CTA });
