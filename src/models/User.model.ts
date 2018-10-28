import { Table, Column, Model, PrimaryKey, IsUUID, HasMany, BelongsToMany } from "sequelize-typescript";
import TimeEntry from "./TimeEntry.model";
import Workspace from "./Workspace.model";
import WorkspaceUser from "./WorkspaceUser.model";
import Subscription from "./Subscription.model";

@Table({
  timestamps: true
})
export default class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey

  @Column
  googleId: string;

  @Column
  imgUrl: string;

  @Column
  name: string;

  @Column
  email: string;

  @HasMany(() => TimeEntry)
  timeEntries: TimeEntry[];

  @HasMany(() => Subscription)
  subscriptions: Subscription[];

  @BelongsToMany(() => Workspace, () => WorkspaceUser)
  worspaces: Workspace[];
}