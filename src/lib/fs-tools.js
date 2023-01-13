import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { writeFile, readJSON, writeJSON, createReadStream } = fs;

const dataPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const publicPath = join(process.cwd(), "./public/image");
const mediaPath = join(dataPath, "media.json");

console.log(mediaPath);

export const getMedias = () => {
  return readJSON(mediaPath);
};

export const writeMedias = (medias) => {
  return writeJSON(mediaPath, medias);
};

export const saveFile = (fileName, buffer) => {
  writeFile(join(publicPath, fileName), buffer);
};

export const readJSONfileStream = () => {
  createReadStream(mediaPath);
};
