import Image from "next/image";
import Link from "next/link";
import type { Collaborator } from "~/actions";

import { Box } from "~/widgets/box";

type PropTypes = {
  collabList: Collaborator[];
};

export const CollabList = ({ collabList }: PropTypes) => (
  <Box
    as="ul"
    gap={3}
    display="flex"
    flexDirection="column"
    padding={0}
    margin={0}
    style={{ listStyleType: "none" }}
  >
    {collabList.map(
      ({ name, profilePhoto, href, description, institution }) => (
        <Box
          key={name}
          display={profilePhoto ? "grid" : "block"}
          gridTemplateColumns="xs"
        >
          {profilePhoto && (
            <Image
              src={profilePhoto}
              alt=""
              aria-hidden
              width={125}
              height={125}
              style={{ borderRadius: "999999px" }}
            />
          )}
          <div>
            {institution && (
              <Box textStyle="small" style={{ fontWeight: 600 }}>
                {institution}
              </Box>
            )}
            <Box as="h3" headingStyle="subtitle" marginTop={0} marginBottom={1}>
              {href ? <Link href={href}>{name}</Link> : name}
            </Box>
            <Box as="p" margin={0}>
              {description}
            </Box>
          </div>
        </Box>
      )
    )}
  </Box>
);
