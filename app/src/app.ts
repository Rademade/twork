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
import morgan from "morgan";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create Express server
const app = express();
app.enable("trust proxy");

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// Add logger middleware
app.use(morgan("combined"));

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// PASSPORT
import initPassportStrategies from "./authentication";
import passport from "passport";

initPassportStrategies(passport);
app.use(passport.initialize());

// Controllers (route handlers)
// ROUTER
import buildRoutingTable from "./router";
import { NextFunction } from "express";
app.use("/apidoc", express.static("apidoc"));
buildRoutingTable(app);

export default app;
