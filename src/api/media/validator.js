import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const mediaSchema = {
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title not specified",
    },
  },
  year: {
    in: ["body"],
    isString: {
      errorMessage: "Year not specified",
    },
  },
  type: {
    in: ["body"],
    isString: {
      errorMessage: "Type not specified",
    },
  },
};

export const checkMediaSchema = checkSchema(mediaSchema);

export const detectBadRequest = (req, res, next) => {
  const possibleErrors = validationResult(req);
  const possibleErrorsArray = possibleErrors.array();

  if (possibleErrors.isEmpty()) {
    next();
  } else {
    next(createHttpError(400, "Something went wrong", { errorsList: possibleErrorsArray }));
  }
};
