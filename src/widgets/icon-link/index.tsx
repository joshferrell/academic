import { CalendarIcon, LinkIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { Box } from "../box";
import { SrOnly } from "../sr-only";
import { ColorSystem } from "~/sprinkles/index.css";

import * as styles from "./style.css";
import { SocialIcon as SocialIconType } from "~/actions/types";

type PropTypes = {
  icon: SocialIconType;
  title: string;
  link: string;
  size?: number;
  variant?: "inverted" | "primary" | "subtle";
};

const getIcon = (icon: SocialIconType, size: number) => {
  switch (icon) {
    case "Linkedin":
      return <LinkedinIcon aria-hidden="true" size={size} />;
    case "Mail":
      return <MailIcon aria-hidden="true" size={size} />;
    case "Calendar":
      return <CalendarIcon aria-hidden="true" size={size} />;
    default:
      return <LinkIcon aria-hidden="true" size={size} />;
  }
};

type IconPropTypes = ColorSystem & { icon: SocialIconType; size?: number };

export const SocialIcon = ({ icon, size = 18, ...boxProps }: IconPropTypes) => (
  <Box {...boxProps} style={{ display: "flex", alignItems: "center" }}>
    {getIcon(icon, size)}
  </Box>
);

export const SocialLink = ({
  icon,
  title,
  link,
  size = 18,
  variant = "primary",
}: PropTypes) => {
  return (
    <a href={link} rel="noreferrer" className={styles.Link({ variant })}>
      {getIcon(icon, size)}
      <SrOnly>{title}</SrOnly>
    </a>
  );
};
