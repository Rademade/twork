import express = require("express");
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv = require("dotenv");
import path from "path";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import cors  = require("cors");
import { Request, Response } from "express";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

// Allow CORS
const corsOptions = {
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// PASSPORT
import initPassportStrategies from "./authentication";
import passport from "passport";

initPassportStrategies(passport);
app.use(passport.initialize());
app.use(passport.session());

// Controllers (route handlers)
// ROUTER
import buildRoutingTable from "./router";
import { NextFunction } from "express";
app.use("/apidoc", express.static("apidoc"));
buildRoutingTable(app);

const staticDir = path.resolve(__dirname, "../client/dist");
console.log(staticDir);

app.use(express.static(staticDir));
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Inside / handler");

  res.sendFile(staticDir + "/index.html");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  console.log("entered into handler", req.url);
  // respond with html page
  if (req.accepts("html")) {
    res.redirect("/");
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});



export default app;
