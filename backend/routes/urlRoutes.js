import express from "express";
import { customAlphabet } from "nanoid";
import userModel from "../models/userModel.js";
import urlModel from "../models/urlModel.js";
import tokenValidation from "../middleware/tokenValidation.js";
const router = express.Router();
const alphabet =
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 8);

router.post("/", tokenValidation, async (req, res) => {
  try {
    const { url,title } = req.body;
    console.log(req.body);
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const urlExist = user.urls.find((u) => u.targetUrl === url);
    if (urlExist) {
      return res
        .status(400)
        .json({ message: "This URL already has a short URL" });
    }

    let shortUrl = nanoid();
    let shortUrlTaken = await urlModel.findOne({ targetUrl: url }) || false;
    while (shortUrlTaken) {
      shortUrl = nanoid();
      shortUrlTaken = await urlModel.findOne({ shortUrl });
    }
    console.log(shortUrl);
    user.urls.push({ shortUrl, targetUrl: url,title });
    urlModel.create({ shortUrl, targetUrl: url ,title,owner:user._id});
    await user.save();

    res.status(200).json({ shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/",tokenValidation,async(req,res)=>{
  const user = await userModel.findOne({email:req.user.email});
  
  res.status(200).json({urls:user.urls});
})
router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    console.log("Received short URL:", shortUrl); // Log the received short URL

    const urlRecord = await urlModel.findOne({ shortUrl });

    console.log("Found URL record:", urlRecord); // Log the found URL record

    if (!urlRecord) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    urlRecord.visitHistory.push({ timestamp: Date.now() });
    await urlRecord.save();
    console.log("Saving the visit");
    res.redirect(urlRecord.targetUrl);
  } catch (error) {
    console.error("Error in redirecting:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:id", tokenValidation, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await userModel.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const urlIndex = user.urls.findIndex((u) => String(u._id) === id);
    if(urlIndex === -1){
      return res.status(404).send("Url not found");
    }
    const shortUrl = user.urls[urlIndex].shortUrl;
    await urlModel.findOneAndDelete({shortUrl});

    if (urlIndex === -1) {
      return res.status(404).send("URL not found");
    }

    user.urls.splice(urlIndex, 1);

    await user.save();

    res.status(200).json({ message: "URL successfully deleted" });

  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
});

export default router;
