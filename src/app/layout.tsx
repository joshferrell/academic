import { fetchFeaturedProject, fetchStudent } from "~/actions";

import { Playfair_Display, Inter } from "next/font/google";
import "normalize.css";
import { themeClass } from "../theme.css";
import * as styles from "./layout.css";
import { Box } from "~/widgets/box";
import Link from "next/link";
import NavBar from "~/widgets/nav-bar";
import { SocialLink } from "~/widgets/icon-link";
import { Metadata } from "next";
import Head from "next/head";
import "./tmp.css";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const generateMetadata = async (): Promise<Metadata> => {
  const student = await fetchStudent();
  return {
    title: student.name,
    description: student.briefBio,
    keywords: student.interests,
  };
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const NavLink = ({ href, text }: { href: string; text: string }) => (
  <li>
    <Box className={styles.NavLink} as={Link} href={href} textStyle="small">
      {text}
    </Box>
  </li>
);

const RootLayout = async ({ children }: RootLayoutProps) => {
  const [project, student] = await Promise.all([
    fetchFeaturedProject(),
    fetchStudent(),
  ]);

  const year = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} ${themeClass}`}
    >
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Box
        as="body"
        color="body"
        backgroundColor="body"
        textStyle="base"
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        style={{ minHeight: "100vh" }}
      >
        <header role="banner">
          <a
            href="#skip"
            accessKey="s"
            style={{ position: "absolute", left: "-1000px", zIndex: 2 }}
          >
            Skip to content.
          </a>
          <NavBar project={project} />
        </header>
        {children}
        <Box as="footer" marginTop="auto" paddingY={3} paddingX={2} bg="footer">
          <Box
            maxWidth="container"
            marginX="auto"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={2}
          >
            <nav>
              <Box
                as="ul"
                marginX="auto"
                marginY={0}
                maxWidth="container"
                gap={[0.125, 0.5]}
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                style={{ listStyleType: "none" }}
                display="flex"
              >
                <NavLink href="/" text="Home" />
                <NavLink href="/about" text="Contact" />
                <NavLink href="/teaching" text="Teaching" />
                <NavLink href="/events" text="Presentations" />
                <NavLink href="/publications" text="Publications" />
                <NavLink href="/projects" text="Projects" />
              </Box>
            </nav>
            <Box
              as="ul"
              display="flex"
              gap={2}
              justifyContent="center"
              padding={0}
              margin={0}
              style={{ listStyleType: "none" }}
            >
              {student.social.map((social) => (
                <li key={social.title}>
                  <SocialLink size={18} variant="subtle" {...social} />
                </li>
              ))}
            </Box>
            <Box textStyle="small" style={{ textAlign: "center" }}>
              &copy; {year}, {student.name}
            </Box>
          </Box>
        </Box>
      </Box>
    </html>
  );
};

export default RootLayout;
