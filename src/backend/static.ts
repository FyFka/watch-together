import express from "express";
import path from "path";

const staticFiles = () => {
  return express.static(path.join(__dirname, "..", "client"), {
    maxAge: "7d",
    index: false,
    setHeaders: (res, _) => {
      if (res.req.path === "/sw.js") {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      }
    },
  });
};

export default staticFiles;
