
import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Workspace from "./Workspace.model";
import User from "./User.mode";

@Table
export default class WorkspaceUser extends Model<WorkspaceUser> {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Workspace)
  @Column
  workspaceId: string;
}