import { Router } from "express";
import upload from "./middlewere/multer.js"
import uploadFileController from "./controller/uploadController.js"

const router = Router()
router.post("/upload", upload.single("file"), uploadFileController);

export default router