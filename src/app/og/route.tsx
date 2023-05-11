export const runtime = "experimental-edge";
import { ImageResponse, type NextRequest } from "next/server";
import OpenGraphImage from "~/widgets/open-graph";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url!);
    const title = searchParams.get("title");
    const subtitle = searchParams.get("subtitle");
    const name = process.env.STUDENT_NAME!;
    const host = process.env.HOST_NAME!;

    if (!title || !subtitle) {
      throw new Error("invalid request");
    }

    return new ImageResponse(
      (
        <OpenGraphImage
          url={host}
          name={name}
          title={title}
          subtitle={subtitle}
        />
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    return new Response("failed to generate image", { status: 500 });
  }
};
