import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const test = ENVIRONMENT === "test";

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const TYPEORM_HOST = test ? process.env["TYPEORM_HOST_TEST"] : process.env["TYPEORM_HOST"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!TYPEORM_HOST) {
    logger.error("No mongo connection string. Set TYPEORM_HOST environment variable.");
    process.exit(1);
}
