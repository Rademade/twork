
import { Table, Column, Model, PrimaryKey, IsUUID, BelongsToMany, Sequelize, Default } from "sequelize-typescript";
import WorkspaceUser from "./WorkspaceUser.model";
import User from "./User.model";

@Table({
  timestamps: true
})
export default class Workspace extends Model<Workspace> {
  @IsUUID(4)
  @PrimaryKey
  @Default(Sequelize.UUIDV4)
  @Column({type: Sequelize.UUID})
  id: string;

  @Column
  name: string;

  @BelongsToMany(() => User, () => WorkspaceUser)
  users: User[];
}