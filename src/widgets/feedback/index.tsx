import { Feedback as FeedbackType } from "~/actions/types";
import Image from "next/image";
import { Box } from "../box";
import Card from "../card";
import Icon from "../icon";
import { vars } from "~/theme.css";
import { GraduationCapIcon } from "lucide-react";

export type FeedbackPropTypes = {
  feedback: FeedbackType;
};

export const Feedback = ({ feedback }: FeedbackPropTypes) => (
  <Card
    variant="secondary"
    style={{
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      borderRadius: vars.radius.lg,
      flex: "40%",
    }}
  >
    <div style={{ position: "absolute", top: ".5rem", left: "1rem" }}>
      <Icon name="quote" size={100} opacity={0.05} />
    </div>
    <blockquote style={{ margin: 0 }}>
      <Box textStyle="large">{feedback.feedback}</Box>
      <footer
        style={{
          marginTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontWeight: 600,
        }}
      >
        {feedback.photo ? (
          <Image
            src={feedback.photo.src}
            alt={feedback.photo.alt}
            width={50}
            height={50}
            style={{ borderRadius: vars.radius.md }}
          />
        ) : (
          <Box
            style={{ width: 50, height: 50 }}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="subtle"
            color="highlight"
          >
            <GraduationCapIcon size={30} />
          </Box>
        )}
        <div>
          {feedback.subtitle && (
            <Box textStyle="small" marginBottom={0.125}>
              {feedback.subtitle}
            </Box>
          )}
          {feedback.title}
        </div>
      </footer>
    </blockquote>
  </Card>
);
