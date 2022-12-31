import { Router } from "express";
import path from "path";

const router = Router();

router.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../../", "web", "build", "index.html"));
});

export default router;
