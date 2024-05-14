const { db } = require("@prisma/client");
import { Request, Response } from "express";
// const verifyModel = require("../db/verification");

const verificationCode = async (req: Request, res: Response) => {
  const { code } = req.body;
  console.log("code", code);
  try {
    if (code.length !== 6 || code.charAt(5) === "7" || !/^\d{6}$/.test(code)) {
      return res.status(400).json({ error: "Verification Error" });
    }
    return res.status(200).json({ success: "true", message: "success" });
  } catch (error) {
    console.log("Error Verifying", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { verificationCode };
