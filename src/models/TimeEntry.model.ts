
import { Table, Column, Model, PrimaryKey, IsUUID, ForeignKey, BelongsTo, DataType, Default } from "sequelize-typescript";
import Workspace from "./Workspace.model";
import Project from "./Project.model";

@Table({
  timestamps: true,
  tableName: "time_entry"
})
export default class TimeEntry extends Model<TimeEntry> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  description: string;

  @Column({ type:  DataType.DATE})
  @Default({value: () => "CURRENT_TIMESTAMP"})
  startedAt: string;

  @Column({type: DataType.DATE})
  stoppedAt: string;

  @Column({type: DataType.BOOLEAN})
  billable: boolean;

  @ForeignKey(() => Workspace)
  @Column
  workspaceId: string;

  @BelongsTo(() => Workspace)
  workspace: Workspace;

  @ForeignKey(() => Project)
  @Column
  projectId: string;

  @BelongsTo(() => Project)
  project: Project;
}