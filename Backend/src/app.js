const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true,
    exposedHeaders: ["auth-token"],
  })
);

app.use(express.json());

app.use(express.static(path.join("public")));

module.exports = app;
