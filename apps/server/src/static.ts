import express from "express";
import path from "path";

const staticFiles = () => {
  return express.static(path.join(__dirname, "../../", "web", "build"), {
    maxAge: "7d",
    index: false,
    setHeaders: (res) => {
      if (res.req.path === "/sw.js") {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      }
    },
  });
};

export default staticFiles;
