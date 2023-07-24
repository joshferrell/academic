import { config } from "dotenv-safe";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

config();

const main = async () => {
  const configPath = path.join(__dirname, "./contentful-export.json");

  exec(
    `contentful space export --space-id=${process.env.CONTENTFUL_SPACE_ID} --environment-id=master --mt=${process.env.CONTENTFUL_ACCESS_TOKEN} --content-file=${configPath} --skip-roles --download-assets`,
    (err, stdout) => {
      if (err) console.log(err);
      console.log(stdout);
    }
  );
};

main();
