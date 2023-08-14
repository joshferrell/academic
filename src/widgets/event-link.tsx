"use client";

import { useMemo } from "react";
import { ics } from "calendar-link";
import { Presentation } from "~/actions/types";
import { Button, ButtonProps } from "~/widgets/button-link";

interface PropTypes extends Omit<ButtonProps, "onClick"> {
  event: Presentation;
}

export const EventLink = ({ event, ...buttonProps }: PropTypes) => {
  const url = useMemo(
    () =>
      ics({
        title: event.title,
        description: event.briefSummary,
        start: event.timeISO,
        location: event.location,
        duration: [1, "hour"],
      }),
    [event]
  );

  const handleClick = () => {
    window.open(url);
  };

  return <Button onClick={handleClick} {...buttonProps} />;
};
