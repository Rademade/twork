
import { Table, Column, Model, PrimaryKey, IsUUID, BelongsToMany } from "sequelize-typescript";
import WorkspaceUser from "./WorkspaceUser.model";
import User from "./User.model";

@Table({
  tableName: "workspace"
})
export default class Workspace extends Model<Workspace> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @BelongsToMany(() => User, () => WorkspaceUser)
  users: User[];
}