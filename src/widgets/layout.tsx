import Image from "next/image";
import { Box } from "./box";
import HomeRow from "./home-row";

type PropTypes = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PropTypes) => (
  <main id="skip">{children}</main>
);

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  img?: {
    src: string;
    alt: string;
  };
  children?: React.ReactNode;
};

const Header = ({ title, subtitle, img, children }: PageHeaderProps) => (
  <HomeRow prominance="focus" background="primary">
    <Box
      color="gradient"
      as="h1"
      headingStyle={["superMobile", "super"]}
      margin="none"
    >
      {title}
    </Box>
    {subtitle && (
      <Box headingStyle="subtitle" marginTop={3} marginBottom={0}>
        {subtitle}
      </Box>
    )}
    {img && (
      <Box
        marginTop={6}
        borderRadius={["lg", "xl"]}
        style={{
          aspectRatio: "16/9",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </Box>
    )}
    {children}
  </HomeRow>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box maxWidth="container" marginX="auto" marginY={5} paddingX={2}>
    {children}
  </Box>
);

const List = ({ children }: { children: React.ReactNode }) => (
  <Box display="flex" flexDirection="column" gap={3}>
    {children}
  </Box>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <Box
    display="flex"
    flexDirection="row"
    flexWrap="wrap"
    alignItems="flex-start"
    justifyContent="space-between"
    gap={3}
  >
    {children}
  </Box>
);

const Sidebar = ({ children }: { children: React.ReactNode }) => (
  <Box flex={["full", "full", 1]}>{children}</Box>
);

const MainColumn = ({ children }: { children: React.ReactNode }) => (
  <Box flex={["full", "full", 2]}>{children}</Box>
);

export default Object.assign(PageLayout, {
  List,
  Header,
  Row,
  Container,
  Sidebar,
  MainColumn,
});
