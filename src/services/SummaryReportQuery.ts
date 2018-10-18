import { TimeEntry } from "../entity/TimeEntry";
import { getRepository, Repository, Between, In, SelectQueryBuilder } from "typeorm";

export interface SummaryReportFilter {
  start: string;
  end: string;
  team?: number[];
  projects?: number[];
  billable?: boolean;
}

export interface SummaryReportGroupings {
  groupBy: "user" | "project";
  subgroupBy: "timeEntry";
}
export class SummaryReportQuery {
  private filter: SummaryReportFilter;
  private grouping: SummaryReportGroupings;
  private timeEntryRepo: Repository<TimeEntry> = getRepository(TimeEntry);

  constructor(filter: SummaryReportFilter, grouping: SummaryReportGroupings) {
    this.filter = filter;
    this.grouping = grouping;
  }

  public async call(): Promise<any> {
    console.log(this.filter);
    console.log(this.grouping);

    let query = this.timeEntryRepo.createQueryBuilder();
    query = this.applyFilters(query);
    // query = this.applyGroupings(query);
    return await query.execute();
  }

  private applyFilters(query: SelectQueryBuilder<TimeEntry>): SelectQueryBuilder<TimeEntry> {
    query = query.where("startedAt between :start AND :end", { start: this.filter.start, end: this.filter.end });
    // if (this.filter.team) { query = query.where("userId IN (:team)", { team: this.filter.team }); }
    if (this.filter.projects) { query = query.where("projectId IN (:projects)", { team: this.filter.projects }); }
    if (this.filter.billable != undefined) { query = query.where("billable is :billable", { billable: this.filter.billable }); }
    return query;
  }
  private applyGroupings(query: SelectQueryBuilder<TimeEntry>): SelectQueryBuilder<TimeEntry> {
    if (this.grouping.groupBy == "project") { query = query.groupBy("projectId"); }
    if (this.grouping.groupBy == "user") { query = query.groupBy("timeEntry.userId"); }
    if (this.grouping.subgroupBy == "timeEntry") { query = query.groupBy("timeEntry.description"); }
    return query;
  }
}