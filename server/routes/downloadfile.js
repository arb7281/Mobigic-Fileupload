const express = require("express")

const router = express.Router()

const {downloadFile} = require("../controllers/downloadFile");

// router.get("/files/:fileName", downloadFile);
router.get("/files/:fileId/:code/:fileName", downloadFile);

module.exports = router