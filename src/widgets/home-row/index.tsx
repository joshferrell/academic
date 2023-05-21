import Link from "next/link";
import { Box } from "../box";
import * as styles from "./style.css";
import { ArrowRight } from "lucide-react";
import { vars } from "~/theme.css";

type RowBackgrounds = "primary" | "surface-01" | "white" | "transparent";
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
  <Box as={Link} textStyle="large" display="block" href={href}>
    {children}
    <ArrowRight
      size={vars.font.textSize.large}
      style={{
        display: "inline-block",
        marginBottom: "-0.125rem",
        marginLeft: vars.space["0.25"],
      }}
    />
  </Box>
);

export default Object.assign(HomeRow, { Title, CTA });
