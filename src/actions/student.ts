import fetchEntries from '~/actions/fetch-entry'
import type { Student } from '~/actions/types'

export const fetchStudent = async (): Promise<Student> => {
  const [student] = await fetchEntries("student", { limit: 1 });

  return {
    name: student.fields.name,
    role: student.fields.role,
    email: student.fields.email,
    interests: student.fields.interests,

    // @ts-ignore typing here with contentful is strange with assets
    profilePhoto: `https:${student.fields.profilePhoto.fields.file.url}`,
    // @ts-ignore typing here with contentful is strange with assets
    cv: student.fields.cv
      ? `https://${(student.fields.cv as any).fields.file.url}`
      : undefined,
    social: student.fields.social,
    education: student.fields.education
      ? (student.fields.education as any).map((x: any) => ({
          title: x.fields.title,
          university: x.fields.university,
        }))
      : [],
    bio: student.fields.bio,
    summary: student.fields.summary,
    briefBio: student.fields.briefBio,
  } as Student;
};


