import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany, ManyToMany, BaseEntity } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { TimeEntry } from "./TimeEntry";

@Entity()
export class Workspace extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => User, user => user.workspaces)
  @JoinTable()
  users: User[];

  @OneToMany(type => Project, project => project.workspace)
  projects: Workspace[];

  @OneToMany(type => TimeEntry, timeEntry => timeEntry.workspace)
  timeEntries: TimeEntry[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
