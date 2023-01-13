import PdfPrinter from "pdfmake";

export const getPdfReadableStream = (mediaArray) => {
  const font = {
    Helvetica: {
      normal: "Helvetica",
    },
  };
  const printer = new PdfPrinter(font);
  console.log(printer);
  const content = mediaArray.map((media) => {
    return [{ text: media.title }, { text: media.year }];
  });
  const docDefinition = {
    content: [...content],
    defaultStyle: {
      font: "Helvetica",
    },
  };
  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();
  return pdfReadableStream;
  //   console.log(mediaArray);
};
