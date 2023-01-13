import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import fs from "fs-extra";

import { pipeline } from "stream";
import { createGzip } from "zlib";
import { getPdfReadableStream } from "../../lib/pdf-tools.js";
import { getMedias, readJSONfileStream, writeMedias } from "../../lib/fs-tools.js";

const filesRouter = express.Router();

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: { folder: "medias/files" },
  }),
}).single("cover");

filesRouter.post("/:id/poster", cloudinaryUploader, async (req, res, next) => {
  try {
    const test = readJSONfileStream();

    console.log(req.file);
    console.log(test);

    const url = req.file.path;

    const medias = await getMedias();
    const mediaINdex = medias.findIndex((media) => media.imdbID === req.params.id);
    if (mediaINdex !== -1) {
      const newMedia = { ...medias[mediaINdex], poster: url };
      medias[mediaINdex] = newMedia;

      await writeMedias(medias);
    }

    res.send({ Message: "File Added" });
  } catch (error) {
    next(error);
  }
});

filesRouter.get("/pdf", async (req, res, next) => {
  res.setHeader("Content-Disposition", "attachment; filename=test.pdf");
  const medias = await getMedias();
  const source = getPdfReadableStream(medias);
  const destination = res;
  console.log("SOURCE", source);
  console.log("MEDIAS", medias);
  pipeline(source, destination, (err) => {
    if (err) console.log(err);
  });
});

export default filesRouter;
