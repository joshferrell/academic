import { fetchCourseList } from "~/actions/courses";

import { Article } from "~/widgets/article";
import PageLayout from "~/widgets/layout";

export const metadata = {
  title: `${process.env.STUDENT_NAME} | Courses`,
  description: `Courses taught or assited by ${process.env.STUDENT_NAME} in their field of study.`,
};

const Courses = async () => {
  const courseList = await fetchCourseList(100);

  return (
    <PageLayout>
      <PageLayout.Header title="Courses" />
      <PageLayout.Container>
        <PageLayout.List>
          {courseList.map((course) => (
            <Article
              title={course.title}
              summary={course.summary}
              date={course.courseTag}
              href={`/courses/${course.id}`}
              key={course.id}
            />
          ))}
        </PageLayout.List>
      </PageLayout.Container>
    </PageLayout>
  );
};

export default Courses;
