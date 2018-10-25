import passport from "passport";
import { Router, Response, Request, Express } from "express";
import { googleCallbackHandlers, googleRedirectWithScope } from "./controllers/auth";
import { index, create, update, destroy, show } from "./controllers/timeEntry";
import * as workspacesMethods from "./controllers/workspaces";
import { me } from "./controllers/user";
import * as projectsRoutes from "./controllers/projects";
import * as reportRoutes from "./controllers/reports";
import * as subscriptioRoutes from "./controllers/subscriptions";


const buildRoutingTable = (app: Express) => {
  // Auth
  const authRouter = Router();

  authRouter.get("/google", googleRedirectWithScope);
  authRouter.get("/google/callback", ...googleCallbackHandlers);

  app.use("/api/v1/auth", authRouter);

  const userRouter = Router();
  userRouter.route("/users/me").get(me);
  app.use("/api/v1", passport.authenticate("jwt", { session: false }), userRouter);

  // TimeEntires
  const timeEntriesRouter = Router();

  timeEntriesRouter.route("/time_entries").get(index).post(create);
  timeEntriesRouter.route("/time_entries/:id").put(update).delete(destroy).get(show);

  app.use("/api/v1", passport.authenticate("jwt", { session: false }), timeEntriesRouter);

  // Projects
  const projectsRouter = Router();
  projectsRouter.route("/projects").get(projectsRoutes.index).post(projectsRoutes.create);
  projectsRouter.route("/projects/:id").delete(projectsRoutes.destroy).put(projectsRoutes.update);
  app.use("/api/v1", passport.authenticate("jwt", { session: false }), projectsRouter);

  const workspacesRouter = Router();
  workspacesRouter.route("/workspaces/:id/users").get(workspacesMethods.workspaceUsers);
  app.use("/api/v1", passport.authenticate("jwt", { session: false }), workspacesRouter);

  const reportsRouter = Router();
  reportsRouter.route("/reports/summary").get(reportRoutes.summary);
  app.use("/api/v1", passport.authenticate("jwt", { session: false }), reportsRouter);

  const subscriptionRouter = Router();
  subscriptionRouter.route("/subscriptions").post(subscriptioRoutes.create);
  app.use("/api/v1", passport.authenticate("jwt", { session: false }), subscriptionRouter);

};

export default buildRoutingTable;
