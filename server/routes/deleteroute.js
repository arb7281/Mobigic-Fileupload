const express = require("express")

const router = express.Router()

const {fileDelete} = require("../controllers/deleteFile");

router.post("/:userId/:fileId/:fileName", fileDelete);

module.exports = router