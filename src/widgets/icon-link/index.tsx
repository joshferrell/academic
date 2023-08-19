import { Box } from "../box";
import { SrOnly } from "../sr-only";
import { ColorSystem } from "~/sprinkles/index.css";

import * as styles from "./style.css";
import { LucidIconType } from "~/actions/types";
import Icon from "../icon";

type PropTypes = {
  icon: LucidIconType;
  title: string;
  link: string;
  size?: number;
  variant?: "inverted" | "primary" | "subtle";
};

type IconPropTypes = ColorSystem & { icon: LucidIconType; size?: number };

export const SocialIcon = ({ icon, size = 18, ...boxProps }: IconPropTypes) => (
  <Box {...boxProps} style={{ display: "flex", alignItems: "center" }}>
    <Icon name={icon} size={size} defaultIcon="link" />
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
      <Icon name={icon} size={size} defaultIcon="link" />
      <SrOnly>{title}</SrOnly>
    </a>
  );
};
