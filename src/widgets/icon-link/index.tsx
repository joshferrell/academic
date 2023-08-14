import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { Box } from "../box";
import { SrOnly } from "../sr-only";
import { ColorSystem } from "~/sprinkles/index.css";

import * as styles from "./style.css";
import { LucidIconType } from "~/actions/types";

type PropTypes = {
  icon: LucidIconType;
  title: string;
  link: string;
  size?: number;
  variant?: "inverted" | "primary" | "subtle";
};

const getIcon = (name: LucidIconType, size: number) => {
  const LucideIcon = dynamicIconImports[name]
    ? dynamic(dynamicIconImports[name])
    : dynamic(dynamicIconImports["link"]);

  return <LucideIcon size={size} />;
};

type IconPropTypes = ColorSystem & { icon: LucidIconType; size?: number };

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
