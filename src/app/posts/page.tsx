import { fetchPostList } from "~/actions/post";

import PageLayout from "~/widgets/layout";
import { Article } from "~/widgets/article";

export const metadata = {
  title: `${process.env.STUDENT_NAME} | Posts`,
  description: `Keep up to date with the latest thoughts and research from ${process.env.STUDENT_NAME}.`,
};

const Posts = async () => {
  const posts = await fetchPostList(100);

  return (
    <PageLayout>
      <PageLayout.Header title="Posts" />
      <PageLayout.Container>
        <PageLayout.List>
          {posts.map((e) => (
            <Article
              key={e.id}
              image={e.img}
              title={e.title}
              tag={e.tags.length ? e.tags[0].title : undefined}
              summary={e.description}
              date={e.date}
              href={`/posts/${e.id}`}
            />
          ))}
        </PageLayout.List>
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Posts;
