import passport from "passport";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import * as _ from "lodash";
import Workspace from "../models/Workspace.model";
import { JwtUserPayload } from "../interfaces";

// /api/v1/auth/google
export const googleRedirectWithScope = passport.authenticate("google", {
  scope: ["profile", "email"]
});
export const googleCallbackHandlers = [
  passport.authenticate("google", { scope: ["profile"], failureRedirect: "/", session: false }),
  async function (req: Request, res: Response) {
    try {
      const jwtUserPayload = _.pick(req.user, ["id", "name", "email"]) as JwtUserPayload;
      const workspace = await Workspace.findOne();
      jwtUserPayload.defaultWorkspaceId = workspace.id;
      const token = jwt.sign(jwtUserPayload, process.env.SECRET_KEY);
      const successRedirectUrl = "/sign/success?token=" + token;
      res.redirect(successRedirectUrl);
    } catch (error) {
      res.status(400).json(error);
    }
  }
];