import { fetchPostList } from "~/actions/post";

import { Article } from "~/widgets/article";
import { Box } from "~/widgets/box";
import HomeRow from "~/widgets/home-row";

const Post = async () => {
  const postList = await fetchPostList(4);

  if (!postList.length) return null;

  return (
    <HomeRow prominance="center" background="white">
      <HomeRow.Title>Posts</HomeRow.Title>
      <Box display="flex" gap={2} flexDirection="column">
        {postList.map((e) => (
          <Article
            key={e.id}
            image={e.img}
            title={e.title}
            summary={e.description}
            href={`/posts/${e.id}`}
            tag={e.tags.length ? e.tags[0].title : undefined}
          />
        ))}
      </Box>
      <HomeRow.CTA href="/posts">View all Posts</HomeRow.CTA>
    </HomeRow>
  );
};

export default Post;
