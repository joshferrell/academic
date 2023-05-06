import {
  forwardRef,
  createElement,
  ElementType,
  AllHTMLAttributes,
} from "react";
import classnames from "classnames";
import { sprinkles, type Sprinkles } from "~/sprinkles/index.css";

type ElementProps = Omit<
  AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "width" | "display"
>;

export interface BoxProps extends ElementProps, Sprinkles {
  as?: ElementType;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({
    as = "div",

    //text system
    textStyle,
    headingStyle,

    //spacing system
    padding,
    paddingTop,
    paddingBottom,
    paddingRight,
    paddingLeft,
    paddingX,
    paddingY,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginX,
    marginY,

    // width system
    maxWidth,
    width,

    //color system
    backgroundColor,
    color,
    bg,

    //flex system
    flex,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    gap,
    display,

    //override props
    className,
    ...htmlProps
  }) => {
    const atomClasses = classnames(
      className,
      sprinkles({
        textStyle,
        backgroundColor,
        color,
        bg,
        headingStyle,
        padding,
        paddingTop,
        paddingBottom,
        paddingRight,
        paddingLeft,
        paddingX,
        paddingY,
        flex,
        flexDirection,
        flexWrap,
        justifyContent,
        alignItems,
        gap,
        display,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginX,
        marginY,
        maxWidth,
        width,
      })
    );

    return createElement(as, { className: atomClasses, ...htmlProps });
  }
);

Box.displayName = "Box";
