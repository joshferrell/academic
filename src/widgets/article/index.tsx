import Image from "next/image";
import Link from "next/link";
import { vars } from "~/theme.css";
import { Box } from "~/widgets/box";

type PropTypes = {
  title: string;
  size?: "large" | "medium";
  tag?: string;
  summary: string;
  href: string;
  date?: string;
  cta?: string;
  image?: {
    src: string;
    alt: string;
  };
};

export const Article = ({
  title,
  summary,
  tag,
  size = "medium",
  href,
  date,
  image,
  cta,
}: PropTypes) => (
  <Box
    as="article"
    display={image ? ["flex", "grid"] : "block"}
    gap={[0.5, 4]}
    gridTemplateRows={size === "medium" ? "sm" : ["md", "md", "lg"]}
    gridTemplateColumns={size === "medium" ? "sm" : ["md", "md", "lg"]}
    flexDirection="column"
    width="full"
  >
    {image && (
      <Link href={href} tabIndex={-1}>
        <Box
          height={size === "medium" ? ["sm", "md"] : ["md", "lg"]}
          borderRadius="md"
          backgroundColor="surface-01"
          style={{
            position: "relative",
            maxHeight: "100%",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill={true}
            style={{ borderRadius: vars.radius.md, objectFit: "cover" }}
          />
        </Box>
      </Link>
    )}
    <div>
      {date && <Box style={{ fontWeight: 600 }}>{date}</Box>}
      {tag && (
        <Box
          headingStyle={size === "medium" ? undefined : "subtitle"}
          style={{ fontWeight: size === "medium" ? 600 : 400 }}
        >
          {tag}
        </Box>
      )}
      <Box
        as="h3"
        headingStyle={size === "medium" ? "subtitle" : "title"}
        marginBottom={size === "medium" ? 0.5 : 1}
        marginTop={0}
      >
        <Link href={href} style={{ color: "inherit" }}>
          {title}
        </Link>
      </Box>
      <Box as="p" margin={0} textStyle={size === "medium" ? "base" : "large"}>
        {summary}
      </Box>
      {cta && (
        <Box
          as={Link}
          marginTop={size === "medium" ? 0.5 : 2}
          display="block"
          href={href}
          textStyle={size === "medium" ? "base" : "large"}
        >
          View project
        </Box>
      )}
    </div>
  </Box>
);
