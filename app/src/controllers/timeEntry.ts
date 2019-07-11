"use strict";

import { Response, Request }         from "express";
import TimeEntry from "../models/TimeEntry.model";
import Project from "../models/Project.model";
import * as _                        from "lodash";

const serializeTimeEntry = (timeEntry: TimeEntry) => {
  return {
    id: timeEntry.id,
    startedAt: timeEntry.startedAt,
    stoppedAt: timeEntry.stoppedAt,
    description: timeEntry.description,
    billable: timeEntry.billable,
    projectId: timeEntry.projectId,
    projectName: (timeEntry.project && timeEntry.project.name),
    workspaceId: timeEntry.workspaceId,
    userId: timeEntry.userId,
    createdAt: timeEntry.createdAt
  };
};
/**
 * @apiDefine Success Success 200
 */

/**
 * @apiDefine Error Error 4xx 5xx
 */

/**
 * @apiGroup TimeEntries
 * @apiName Get TimeEntries
 * @apiPermission User
 * @api {get} /time_entries Get TimeEntries
 * @apiDescription
 * Get all time entries
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/api/v1/time_entries
 * @apiSuccess (Success) {Object[]} array             List of timeEntries.
 * @apiSuccess (Success) {String}   array._id         UID
 * @apiSuccess (Success) {String}   array.description Description
 * @apiSuccess (Success) {String}   array.startedAt Stop time
 * @apiSuccess (Success) {String}   array.stoppedAt Stop time
 * @apiError  (Error) {String} Server error
 */

export const index = async (req: Request, res: Response) => {
  const timeEntries = await TimeEntry.findAll({
    where: {userId: req.user.id},
    order: [["createdAt", "DESC"]],
    include: [Project]
  });
  res.json(timeEntries.map(timeEntry => serializeTimeEntry(timeEntry)));
};


export const show = async (req: Request, res: Response) => {
  const timeEntry = await TimeEntry.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: [Project]
  });
  res.json(serializeTimeEntry(timeEntry));
};


/**
 * @apiName Create Time Entry
 * @apiGroup TimeEntries
 * @apiPermission User
 * @api {post} /time_entries Create Time Entry
 * @apiParam {String} [startedAt]  Datetime ISO string
 * @apiParam {String} [stoppedAt]  Datetime ISO string
 * @apiParam {Boolean} [billable]  billable flag
 * @apiParam {String} [description]  Description
 */
export const create =  async (req: Request, res: Response) => {
  try {
    let timeEntryParams = _.pick(req.body, ["id", "startedAt", "stoppedAt", "description", "billable", "projectId", "workspaceId"]) as any;
    timeEntryParams = _.pickBy(timeEntryParams, _.identity);
        // TODO: Create transaction
    await TimeEntry.update(
      {stoppedAt: new Date().toISOString()},
      // tslint:disable-next-line:no-null-keyword
      {where: { userId: req.user.id, stoppedAt: { $eq: null } }}
    );
    const timeEntry = await TimeEntry.create({
      ...timeEntryParams,
      userId: req.user.id,
      include: [Project]
    });
    res.json(serializeTimeEntry(timeEntry));
  } catch (error) {
    res.status(400).json(error);
  }
};


export const update = async (req: Request, res: Response) => {
  try {
    const timeEntry = await TimeEntry.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [Project]
    });
    const timeEntryParams = _.pick(req.body, ["startedAt", "stoppedAt", "description", "billable", "projectId"]) as any;
    await timeEntry.update(timeEntryParams);
    const updatedTimeEntry =  await TimeEntry.findOne({ where: { id: req.params.id}, include: [Project]});
    res.json(serializeTimeEntry(updatedTimeEntry));
  } catch (error) {
    res.status(400).json(error);
  }
};

/**
 * @apiName Delete Time Entry
 * @apiGroup TimeEntries
 * @apiPermission User
 * @api {delete} /time_entries/:id Delete Time Entry
 */
export const destroy = async (req: Request, res: Response) => {
  try {
    const timeEntry = await TimeEntry.findOne({ where: { id: req.params.id, userId: req.user.id }});
    await timeEntry.destroy();
    return res.json(serializeTimeEntry(timeEntry));
  } catch (error) {
    res.status(400).json(error);
  }
};
