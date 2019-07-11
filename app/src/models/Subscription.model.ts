import { Table, Column, Model, PrimaryKey, IsUUID, BelongsTo, ForeignKey, Default, Sequelize } from "sequelize-typescript";
import User from "./User.model";

@Table({
  timestamps: true
})
export default class Subscription extends Model<Subscription> {
  @IsUUID(4)
  @PrimaryKey
  @Default(Sequelize.UUIDV4)
  @Column({type: Sequelize.UUID})
  id: string;

  @Column
  endpoint: string;

  @Column
  p256dh: string;

  @Column
  auth: string;

  @Column
  @ForeignKey(() => User)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}