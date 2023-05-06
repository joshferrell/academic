import { ElementType } from "react";
import { Box } from "~/widgets/box";
import { card } from "./style.css";
import { FlexSystem, WidthSystem } from "~/sprinkles/index.css";

type PropTypes = FlexSystem &
  WidthSystem & {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
  };

const Card = ({ children, variant = "primary", ...systemProps }: PropTypes) => (
  <Box as="section" className={card({ variant })} {...systemProps}>
    {children}
  </Box>
);

type CardTitleProps = {
  title: string;
  as?: ElementType;
};

const CardTitle = ({ title, as = "h2" }: CardTitleProps) => (
  <Box as={as} headingStyle="subtitle" margin={0}>
    {title}
  </Box>
);

export default Object.assign(Card, { Title: CardTitle });
