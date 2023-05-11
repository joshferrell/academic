import Link from "next/link";
import { MarginSystem, WidthSystem, sprinkles } from "~/sprinkles/index.css";
import classNames from "classnames";
import { button } from "./styles.css";

type PropTypes = MarginSystem &
  WidthSystem & {
    href: string;
    isExternal?: boolean;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "tertiary";
    size?: "normal" | "small" | "medium";
  };

export const ButtonLink = ({
  href,
  isExternal = false,
  children,
  variant = "primary",
  size = "normal",
  ...classProps
}: PropTypes) => {
  const styles = classNames(button({ variant, size }), sprinkles(classProps));

  if (!isExternal) {
    return (
      <Link className={styles} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <a className={styles} href={href} rel="noreferrer">
      {children}
    </a>
  );
};
