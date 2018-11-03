"use strict";

import { Response, Request } from "express";
import { Project, Workspace, Subscription }  from "../models";
import * as _                from "lodash";
import webpush from "web-push";
/**
 * @apiDefine Success Success 200
 */

/**
 * @apiDefine Error Error 4xx 5xx
 */

/**
 * @apiGroup Projects
 * @apiName Get Projects
 * @apiPermission User
 * @api {get} /projects Get Projects
 * @apiDescription
 * Get all projects
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/api/v1/users/me/projects
 * @apiSuccess (Success) {Object[]} array             List of projects.
 * @apiSuccess (Success) {String}   array._id         UID
 * @apiSuccess (Success) {String}   array.name        Name of project
 * @apiError  (Error) {String} Server error
 */
export const index = async (req: Request, res: Response) => {
  const workspace = await Workspace.findOne({where: { name: "Rademade"}});
  const projects = await Project.findAll({where: { workspaceId: workspace.id }});
  res.json(projects);
};

/**
 * @apiName Create Project
 * @apiGroup Projects
 * @apiPermission User
 * @api {post} /projects Create Project
 * @apiParam {String} [name]  String
 * @apiParam {String} [workspaceID]  String
 */
export const create =  async (req: Request, res: Response) => {
  try {
    const projectParams = _.pick(req.body, ["name", "workspaceId"]) as any;
    const project = Object.assign(new Project(), projectParams);
    await project.save();
    webpush.setVapidDetails(
      "mailto:yk@rademade.com",
      process.env.WEB_PUSH_VAPID_PUBLIC_KEY,
      process.env.WEB_PUSH_VAPID_PRIVATE_KEY
    );
    const pushPayload = {
      title: `New project "${project.name}" added!`,
      channel: "new-project"
    };
    const subscriptions = await Subscription.findAll();
    subscriptions.forEach((subscription) => {
      const pushSub = {
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.auth,
          p256dh: subscription.p256dh
        }
      };
      webpush.sendNotification(pushSub, JSON.stringify(pushPayload));
    });
    res.json(project);
  } catch (error) {
    res.status(400).json(error);
  }
};

/**
 * @apiName Update Project
 * @apiGroup Projects
 * @apiPermission User
 * @api {put} /projects/:id Update Project
 * @apiParam {String} [name]  String
 * @apiParam {String} [project]  Number;
 */
export const update = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne(req.params.id);
    project.name = req.body.name;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json(error);
  }
};

/**
 * @apiName Delete Project
 * @apiGroup Projects
 * @apiPermission none
 * @api {delete} /projects/:id Delete Project
 */
export const destroy = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    await project.destroy();
    res.json(project);
  } catch (error) {
    // console.log(error);
    res.status(400).json(error);
  }
};
