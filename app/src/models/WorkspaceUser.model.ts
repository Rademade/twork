
import { Table, Column, Model, ForeignKey, Sequelize } from "sequelize-typescript";
import Workspace from "./Workspace.model";
import User from "./User.model";

@Table({
  timestamps: true
})
export default class WorkspaceUser extends Model<WorkspaceUser> {
  @ForeignKey(() => User)
  @Column({type: Sequelize.UUID})
  userId: string;


  @ForeignKey(() => Workspace)
  @Column({type: Sequelize.UUID})
  workspaceId: string;

}