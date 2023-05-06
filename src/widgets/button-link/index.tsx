import Link from "next/link";
import { MarginSystem, WidthSystem, sprinkles } from "~/sprinkles/index.css";
import classNames from "classnames";
import { button } from "./styles.css";

type PropTypes = MarginSystem &
  WidthSystem & {
    href: string;
    isExternal?: boolean;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
  };

export const ButtonLink = ({
  href,
  isExternal = false,
  children,
  variant = "primary",
  ...classProps
}: PropTypes) => {
  const styles = classNames(button({ variant }), sprinkles(classProps));

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
