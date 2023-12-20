import { createRouter } from "next-connect";
import multer from "multer";
import path from "path";

const handler = createRouter;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const times = Date.now();
    cb(null, times + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default handler;
