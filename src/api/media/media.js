import express from "express";
import uniqid from "uniqid";
import { getMedias, writeMedias } from "../../lib/fs-tools.js";
import { checkMediaSchema, detectBadRequest } from "./validator.js";

const mediaRouter = express.Router();

mediaRouter.post("/", checkMediaSchema, detectBadRequest, async (req, res, next) => {
  try {
    const newMedia = { ...req.body, imdbID: uniqid() };
    const medias = await getMedias();

    medias.push(newMedia);
    writeMedias(medias);
    res.status(201).send(newMedia);
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/", async (req, res, next) => {
  try {
    const medias = await getMedias();

    res.status(200).send(medias);
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/:id", async (req, res, next) => {
  try {
    const medias = await getMedias();
    const id = req.params.id;
    const foundMedia = medias.find((media) => media.id === id);

    res.status(200).send(foundMedia);
  } catch (error) {
    next(error);
  }
});

mediaRouter.put("/:id", async (req, res, next) => {
  try {
    const medias = await getMedias();
    const id = req.params.id;
    const initialMediaIndex = medias.findIndex((planner) => planner.id === id);
    const initialMedia = medias[initialMediaIndex];
    const updatedMedia = { ...initialMedia, ...req.body, updatedAt: new Date() };
    medias[initialMediaIndex] = updatedMedia;
    writeMedias(medias);
    res.status(200).send(updatedMedia);
  } catch (error) {
    next(error);
  }
});

mediaRouter.delete("/:id", async (req, res, next) => {
  try {
    const medias = await getMedias();
    const id = req.params.id;
    const remainingmedias = medias.filter((medias) => medias.id !== id);
    writeMedias(remainingmedias);
    res.status(200).send(remainingmedias);
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
