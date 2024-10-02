const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
    exposedHeaders: ["auth-token"],
  })
);

app.use(express.json());

app.use(express.static(path.join("public")));

module.exports = app;
