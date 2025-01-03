import express from "express";
const router = express.Router();
import qrcode from "qrcode";
import tokenValidation from "../middleware/tokenValidation.js";
router.post("/", tokenValidation, async (req, res) => {
  const link = req.body.url;
  const { title } = req.body || "No title";
  const user = req.user;
  const userQrs = user.qrCodes;

  const existingQr = userQrs.find(qr => qr.targetUrl === link);
  if (existingQr) {
    return res.status(400).json({ message: "This url already has a qr code" });
  }

  qrcode.toDataURL(link, async (err, src) => {
    if (err) {
      console.log(err);
      return res.send("Error generating QR Code");
    }

    userQrs.push({ qrCode: src, targetUrl: link, title: title });
    await user.save();
    res.send(src);
  });
});
router.get("/",tokenValidation,(req,res)=>{
    const qrs = req.user.qrCodes;
    res.json({qrs});
})
export default router;