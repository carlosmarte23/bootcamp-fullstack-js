import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const folder = process.argv[2] || ".";

let files;
try {
  files = await readdir(folder);
} catch (error) {
  console.error(`No se pudo leer el directorio ${folder}`);
  process.exit(1);
}

function formatSize(size) {
  if (size < 1024) return `${size} B`;
  return `${(size / 1024).toFixed(2)} KB`;
}

const filePromises = files.map(async (file) => {
  const filePath = path.join(folder, file);
  const stats = await stat(filePath);

  const isDirectory = stats.isDirectory();
  const fileType = isDirectory ? "📁" : "📄";
  const fileSize = isDirectory ? "-" : formatSize(stats.size);
  const fileModified = stats.mtime.toLocaleDateString();

  return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified.padStart(20)}`;
});

const filesInfo = await Promise.all(filePromises);
console.log(
  `${"".padEnd(2)} ${"name".padEnd(20)} ${"size".padStart(10)} ${"Last Modified".padStart(20)}`,
);
filesInfo.forEach((line) => console.log(line));
