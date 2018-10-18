"use strict";

import { Response, Request }         from "express";
import { TimeEntry } from "../entity/TimeEntry";
import { NextFunction }              from "express-serve-static-core";
import * as _                        from "lodash";
import { prototype } from "nodemailer/lib/dkim";
import { getRepository } from "typeorm";


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
    createdAt: timeEntry.createdAt,
    updatedAt: timeEntry.updatedAt
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
  const timeEntries = await getRepository(TimeEntry).find({
    where: { userId: req.user.id }, order: { createdAt: "DESC"},
    relations: ["project"]
  });
  res.json(timeEntries.map(timeEntry => serializeTimeEntry(timeEntry)));
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
    const timeEntry = Object.assign(new TimeEntry(), timeEntryParams);
    timeEntry.userId = req.user.id;
    await getRepository(TimeEntry).save(timeEntry);
    res.json(serializeTimeEntry(timeEntry));
  } catch (error) {
    res.status(400).json(error);
  }
};

/**
 * @apiName Update Time Entry
 * @apiGroup TimeEntries
 * @apiPermission User
 * @api {put} /time_entries/:id Update Time Entry
 * @apiParam {String} [startedAt]  Datetime ISO string
 * @apiParam {String} [stoppedAt]  Datetime ISO string
 * @apiParam {Boolean} [billable]  billable flag
 * @apiParam {String} [description]  Description
 */
export const update = async (req: Request, res: Response) => {
  try {
    let timeEntryParams = _.pick(req.body, ["startedAt", "stoppedAt", "description", "billable", "projectId"]) as any;
    timeEntryParams = _.pickBy(timeEntryParams, _.identity);
    const timeEntryRepo = getRepository(TimeEntry);
    let timeEntry = await timeEntryRepo.findOne({where: { id: req.params.id, userId: req.user.id }, relations: ["project"]}) ;
    timeEntry = Object.assign(timeEntry, timeEntryParams);
    await timeEntryRepo.save(timeEntry);
    res.json(serializeTimeEntry(timeEntry));
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
    const timeEntryRepo = getRepository(TimeEntry);
    const timeEntry = await timeEntryRepo.findOne({ where: { id: req.params.id, userId: req.user.id }, relations: ["project"]});
    await timeEntryRepo.delete(timeEntry);
    res.json(serializeTimeEntry(timeEntry));
  } catch (error) {
    res.status(400).json(error);
  }
};
