import { Link, Linkedin, Mail } from "lucide-react";
import { Box } from "../box";
import { SrOnly } from "../sr-only";

import * as styles from "./style.css";

type PropTypes = {
  icon: "Mail" | "Linkedin";
  title: string;
  link: string;
};

export const SocialLink = ({ icon, title, link }: PropTypes) => {
  const getIcon = () => {
    switch (icon) {
      case "Linkedin":
        return <Linkedin aria-hidden="true" />;
      case "Mail":
        return <Mail aria-hidden="true" />;
      default:
        return <Link aria-hidden="true" />;
    }
  };

  return (
    <a href={link} rel="noreferrer" className={styles.Link}>
      {getIcon()}
      <SrOnly>{title}</SrOnly>
    </a>
  );
};
