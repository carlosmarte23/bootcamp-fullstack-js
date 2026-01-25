// For using with permissions run with:
// node --permission --allow-fs-read="archivo.txt" --allow-fs-write="output/files/documents" manage-files.js

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

let content = "";

if (process.permission.has("fs.read", "archivo.txt")) {
  content = await readFile("archivo.txt", "utf-8");
  console.log(content);
} else {
  console.log("No tienes permiso para leer el archivo");
}

if (process.permission.has("fs.write", "output/files/documents")) {
  const outputDir = join("output", "files", "documents");
  await mkdir(outputDir, { recursive: true });

  const upperCaseContent = content.toUpperCase();
  const outputFilePath = join(outputDir, "archivo-upercase.txt");

  console.log("La extensión del archivo es: ", extname(outputFilePath));
  console.log("El nombre del archivo es: ", basename(outputFilePath));

  await writeFile(outputFilePath, upperCaseContent);
  console.log("Archivo creado con contendido en mayúsculas");
} else {
  console.log(
    "No tienes permiso para escribir en el archivo en la carpeta output",
  );
}
