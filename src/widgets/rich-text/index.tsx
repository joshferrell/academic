import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { VideoPlayer } from "../video-player";

// @ts-ignore
import { BLOCKS } from "@contentful/rich-text-types";

import {
  FileType2Icon,
  FileX2Icon,
  FileIcon,
  FileCodeIcon,
  FileAudio2Icon,
} from "lucide-react";

import { Box } from "../box";
import * as styles from "./style.css";
import Image from "next/image";
import { vars } from "~/theme.css";

type AssetBlockProps = {
  title: string;
  description?: string;
  file: {
    url: string;
    details: { size: number };
    fileName: string;
    contentType: string;
  };
};

const AssetIcon = ({ asset }: { asset: string }): any => {
  const defaultProps = {
    size: 24,
    color: vars.color.text.highlight,
  };

  switch (asset) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
    case "text/plain":
      return <FileType2Icon {...defaultProps} />;
    case "text/html":
    case "application/java-archive":
    case "text/javascript":
      return <FileCodeIcon {...defaultProps} />;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
    case "text/csv":
      return <FileX2Icon {...defaultProps} />;
    case "audio/ogg":
    case "audio/aac":
    case "audio/midi":
    case "audio/x-midi":
    case "audio/mpeg":
    case "audio/ogg":
    case "audio/opus":
    case "audio/webm":
    case "audio/wave":
      return <FileAudio2Icon {...defaultProps} />;
    default:
      return <FileIcon {...defaultProps} />;
  }
};

const AssetBlock = (props: AssetBlockProps) => (
  <a className={styles.AssetBox} href={props.file.url}>
    <AssetIcon asset={props.file.contentType} />
    <div style={{ minHeight: "24px" }}>{props.title}</div>
  </a>
);

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
    [BLOCKS.QUOTE]: (_: any, children: any) => (
      <Box
        paddingLeft={1}
        marginLeft={2}
        style={{
          fontStyle: "italic",
          borderLeft: "2px solid",
          borderColor: vars.color.borders.primary,
        }}
      >
        {children}
      </Box>
    ),
    ["hyperlink"]: (asset: any, children: any) => {
      const url = asset.data.uri;
      const mediaRendering = ["youtube.com", "vimeo.com", "twitch.tv"];
      if (mediaRendering.some((x) => url.includes(x))) {
        return <VideoPlayer url={url} />;
      }

      return <a href={url}>{children}</a>;
    },
    ["asset-hyperlink"]: (asset: any, children: any) => (
      <a href={asset.data.target.fields.file.url}>{children}</a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (asset: any) => {
      const fields = asset.data.target.fields;
      if (fields.file.contentType.includes("image/")) {
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
              alt={fields.file.title}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </Box>
        );
      } else {
        return <AssetBlock {...fields} />;
      }
    },
  },
  renderText: (text: any) => text.replace("!", "?"),
};

const renderRichToReact = (document: any) => {
  console.log(document.content[0].content);
  return documentToReactComponents(document, options);
};

export default renderRichToReact;
