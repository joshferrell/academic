import Image from "next/image";
import Link from "next/link";
import { vars } from "~/theme.css";
import { Box } from "~/widgets/box";

type PropTypes = {
  title: string;
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
  href,
  date,
  image,
  cta,
}: PropTypes) => (
  <Box
    as="article"
    display="flex"
    gap={[0.5, 4]}
    flexDirection={["column", "row"]}
  >
    {image && (
      <div>
        <Image
          src={image.src}
          alt={image.alt}
          width={200}
          height={200}
          style={{ borderRadius: vars.radius.md }}
        />
      </div>
    )}
    <div>
      {date && <Box style={{ fontWeight: 600 }}>{date}</Box>}
      <Box as="h3" headingStyle="subtitle" marginBottom={0.5} marginTop={0}>
        <Link href={href} style={{ color: "inherit" }}>
          {title}
        </Link>
      </Box>
      <Box as="p" margin={0}>
        {summary}
      </Box>
      {cta && (
        <Box as={Link} marginTop={0.5} display="block" href={href}>
          View project
        </Box>
      )}
    </div>
  </Box>
);
