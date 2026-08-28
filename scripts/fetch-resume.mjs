import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const source = join(
  homedir(),
  "Projects/haux49/programmatic-resume/output/romain-sickenberg-backend-en.pdf",
);
const destination = join(
  import.meta.dirname,
  "../public/assets/pdf/romainsickenberg_resume.pdf",
);

mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);

console.log(`Copied resume:\n  ${source}\n  -> ${destination}`);
