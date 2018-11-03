
import { Table, Column, Model, PrimaryKey, IsUUID, ForeignKey, BelongsTo, DataType, Default, Sequelize } from "sequelize-typescript";
import Workspace from "./Workspace.model";
import Project from "./Project.model";
import User from "./User.model";

@Table({
  timestamps: true
})
export default class TimeEntry extends Model<TimeEntry> {
  @IsUUID(4)
  @PrimaryKey
  @Default(Sequelize.UUIDV4)
  @Column({type: Sequelize.UUID})
  id: string;

  @Column
  description: string;

  @Default({value: () => "CURRENT_TIMESTAMP"})
  @Column({ type:  DataType.DATE})
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

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}