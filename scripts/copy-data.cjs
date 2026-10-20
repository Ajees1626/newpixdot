const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "..", "..", "new pixdot website", "frontend", "src", "data");
const DEST = path.join(__dirname, "..", "src", "constants", "data");

const FILES = [
  "caseStudiesData.json",
  "industriesData.json",
  "projectsData.json",
  "servicesData.json",
  "solutionsData.json",
];

fs.mkdirSync(DEST, { recursive: true });

for (const file of FILES) {
  fs.copyFileSync(path.join(SRC, file), path.join(DEST, file));
  console.log(`Copied ${file}`);
}

console.log("Done — all 5 JSON files in src/constants/data/");
