import Link from "next/link";
import { MarginSystem, WidthSystem, sprinkles } from "~/sprinkles/index.css";
import classNames from "classnames";
import { button } from "./styles.css";

export type ButtonLinkProps = MarginSystem &
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
}: ButtonLinkProps) => {
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

export type ButtonProps = Omit<ButtonLinkProps, "href"> & {
  onClick: () => void;
};

export const Button = ({
  children,
  variant = "primary",
  size = "normal",
  onClick,
  ...classProps
}: ButtonProps) => {
  const styles = classNames(button({ variant, size }), sprinkles(classProps));

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
};
