"use client";

import ReactPlayer from "react-player";

type PropTypes = {
  url: string;
};

export const VideoPlayer = ({ url }: PropTypes) => <ReactPlayer url={url} />;
