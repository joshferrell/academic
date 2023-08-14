import { ElementType } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { Box } from "~/widgets/box";
import Icon from "~/widgets/icon";
import { SrOnly } from "~/widgets/sr-only";

import { FlexSystem, WidthSystem, MarginSystem } from "~/sprinkles/index.css";
import { card } from "./style.css";
import { LucidIconType } from "~/actions/types";

type PropTypes = FlexSystem &
  WidthSystem &
  Omit<
    React.HTMLProps<HTMLDivElement>,
    "as" | "width" | "color" | "height" | "ref"
  > & {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
  };

const Card = ({ children, variant = "primary", ...systemProps }: PropTypes) => (
  <Box as="section" className={card({ variant })} {...systemProps}>
    {children}
  </Box>
);

type CardTitleProps = MarginSystem & {
  title: string;
  as?: ElementType;
};

const CardTitle = ({ title, as = "h2", ...boxProps }: CardTitleProps) => (
  <Box
    as={as}
    headingStyle="subtitle"
    margin={0}
    marginBottom={0.5}
    {...boxProps}
  >
    {title}
  </Box>
);

type DefinitionType = {
  value: string;
  href?: string;
  isPill?: boolean;
};

export type DefinitionList = {
  term: string;
  icon?: LucidIconType;
  definition: DefinitionType;
};

type CardDefinitionList = MarginSystem & {
  definitions: DefinitionList[];
};

const Definition = ({ value, href, isPill }: DefinitionType) => {
  if (href)
    return (
      <a href={href} rel="noreferrer">
        {value}
      </a>
    );
  if (isPill)
    return (
      <Box
        display="inline-block"
        paddingX={1}
        bg="surface-01"
        borderRadius="lg"
      >
        {value}
      </Box>
    );
  return <span>{value}</span>;
};

const CardDefinitionList = ({
  definitions,
  ...boxProps
}: CardDefinitionList) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
    as="dl"
    margin={0}
    {...boxProps}
  >
    {definitions.map(({ term, icon, definition }) => (
      <Box key={term} display="flex" gap={1} flexDirection="row">
        <dt>
          {icon ? (
            <>
              <SrOnly>{term}</SrOnly>
              <Icon name={icon} size={20} />
            </>
          ) : (
            term
          )}
        </dt>
        <Box as="dd" margin={0}>
          <Definition {...definition} />
        </Box>
      </Box>
    ))}
  </Box>
);

export default Object.assign(Card, {
  Title: CardTitle,
  DefinitionList: CardDefinitionList,
});
