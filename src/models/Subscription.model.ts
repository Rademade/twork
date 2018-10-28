import { Table, Column, Model, PrimaryKey, IsUUID, BelongsTo, ForeignKey } from "sequelize-typescript";
import User from "./User.mode";

@Table({
  tableName: "subscription"
})
export default class Subscription extends Model<Subscription> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  endpoint: string;

  @Column
  p256dh: string;

  @Column
  auth: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}