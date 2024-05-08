import express from "express";
const router = express.Router();

const { verificationCode } = require("../controllers/verificationController");

router.post("/verify", verificationCode);

module.exports = router;
