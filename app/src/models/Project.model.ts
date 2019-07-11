import { Table, Column, Model, PrimaryKey, IsUUID, HasMany, BelongsTo, ForeignKey, Sequelize, Default } from "sequelize-typescript";
import TimeEntry from "./TimeEntry.model";
import Workspace from "./Workspace.model";

@Table({
  timestamps: true
})
export default class Project extends Model<Project> {
  @IsUUID(4)
  @PrimaryKey
  @Default(Sequelize.UUIDV4)
  @Column({type: Sequelize.UUID})
  id: string;

  @Column
  name: string;

  @ForeignKey(() => Workspace)
  @Column
  workspaceId: string;

  @BelongsTo(() => Workspace)
  workspace: Workspace;

  @HasMany(() => TimeEntry)
  timeEntries: TimeEntry[];
}