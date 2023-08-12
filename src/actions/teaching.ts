import fetchEntries from '~/actions/fetch-entry';
import { formatCollaboratorList } from '~/actions/collaborator';
import { Teaching } from '~/actions/types';

export const fetchTeaching = async (): Promise<Teaching> => {
  const [experience] = await fetchEntries("teaching", { limit: 1 });

  return {
    title: experience.fields.title,
    content: experience.fields.content,
    mentees: formatCollaboratorList(experience.fields.mentorship),
  } as Teaching;
};
