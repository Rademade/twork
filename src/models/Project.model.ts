import { Table, Column, Model, PrimaryKey, IsUUID, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import TimeEntry from "./TimeEntry.model";
import Workspace from "./Workspace.model";

@Table({
  timestamps: true
})
export default class Project extends Model<Project> {
  @IsUUID(4)
  @PrimaryKey
  id: string;

  @Column
  googleId: string;

  @Column
  imgUrl: string;

  @Column
  name: string;

  @Column
  email: string;

  @ForeignKey(() => Workspace)
  @Column
  workspaceId: string;

  @BelongsTo(() => Workspace)
  workspace: Workspace;

  @HasMany(() => TimeEntry)
  timeEntries: TimeEntry[];
}