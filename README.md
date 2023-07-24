This is a web portfolio intended for academic students. Anyone is free to fork this project in order to create their own website. As my personal needs for an academic website change, there may be some breaking changes if you intend to get the latest. It's advised to avoid changing code values in order to make sure you get all the cool features as they come.

## Getting Started

### Install the contentful cli

```sh
brew install contentful-cli
```

[View additional installation methods](https://www.contentful.com/developers/docs/tutorials/cli/installation/)

### Setup your environment

Copy the environment variables from .env.example into a new file called `.env`. You'll need to get your access token, space id, and content delivery token from your contentful account. Once you've updated your environment variables run the following command to setup your content model in contentful.

**Important**: Make sure that your contentful space is empty before running this command.

```sh
pnpm initialize
```

### Run the application locally

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
