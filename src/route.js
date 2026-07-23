import { Router } from "express";
import upload from "./middlewere/multer.js"
import uploadFileController from "./controller/uploadController.js"
import getuploadFileController from "./controller/getController.js"

const router = Router()
router.post("/upload", upload.single("file"), uploadFileController);
router.get("/upload", getuploadFileController);
router.get("/upload/:id", getuploadFileController);

export default router