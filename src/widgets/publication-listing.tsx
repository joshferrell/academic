import { ProcessNodeDefinitions, Parser } from "html-to-react";
import Link from "next/link";
import React from "react";

import type { Publication } from "~/actions/types";
import { Box } from "./box";

type PropTypes = {
  publicationList: Publication[];
  gap?: "small" | "large";
};

export const PublicationListing = ({
  publicationList,
  gap = "small",
}: PropTypes) => {
  const processingInstructions = [
    {
      // handle custom <a /> tags to be nextjs links
      shouldProcessNode: (node: any) => node.name === "a",
      processNode: (node: any, children: any, index: number) => (
        <Link key={index} href={node.attribs.href}>
          {children[0]}
        </Link>
      ),
    },
    {
      shouldProcessNode: () => true,
      // @ts-ignore
      processNode: new ProcessNodeDefinitions(React).processDefaultNode,
    },
  ];

  return (
    <Box
      as="ul"
      display="flex"
      flexDirection="column"
      gap={gap === "small" ? 2 : 3}
      padding={0}
      margin={0}
      style={{ listStyleType: "none" }}
    >
      {publicationList.map((x) => {
        // @ts-ignore
        const elements = new Parser().parseWithInstructions(
          x.citationHTML,
          () => true,
          processingInstructions
        );

        return (
          <Box as="li" textStyle="large" key={x.id}>
            <span className="citation-item">{elements}</span>
            {x.status !== "Published" && x.status !== "In Preparation" && (
              <span>[{x.status}]</span>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
