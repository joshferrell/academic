import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// @ts-ignore
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

import { Box } from "./box";
import Image from "next/image";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: any) => <Box as="p">{children}</Box>,
    [BLOCKS.HEADING_1]: (_: any, children: any) => (
      <Box as="h1" headingStyle={"superMobile"}>
        {children}
      </Box>
    ),
    [BLOCKS.HEADING_2]: (_: any, children: any) => (
      <Box as="h2" headingStyle={"title"}>
        {children}
      </Box>
    ),
    [BLOCKS.HEADING_3]: (_: any, children: any) => (
      <Box as="h3" headingStyle={"subtitle"}>
        {children}
      </Box>
    ),
    [BLOCKS.HEADING_4]: (_: any, children: any) => (
      <Box as="h4" textStyle="large" style={{ fontWeight: 600 }}>
        {children}
      </Box>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (asset: any) => {
      const fields = asset.data.target.fields;
      return (
        <Box
          marginY={2}
          borderRadius={["lg", "xl"]}
          style={{
            aspectRatio: "16/9",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={`https:${fields.file.url}`}
            alt={fields.title}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </Box>
      );
    },
  },
  renderText: (text: any) => text.replace("!", "?"),
};

const renderRichToReact = (document: any) =>
  documentToReactComponents(document, options);

export default renderRichToReact;
