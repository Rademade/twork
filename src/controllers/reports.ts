"use strict";

import { Response, Request } from "express";
import * as _ from "lodash";
import { SummaryReportFilter, SummaryReportQuery } from "../services/SummaryReportQuery";

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
export const summary = async (req: Request, res: Response) => {
  debugger;
  const filter = _.pick(req.query, ["start", "end", "team", "billable", "projects"]) as SummaryReportFilter;
  const groupBy = _.pick(req.query, ["groupBy", "subgroupBy"]);
  const summaryReportQuery = new SummaryReportQuery(filter, groupBy);
  const result = await summaryReportQuery.call();
  res.json(result);
};
