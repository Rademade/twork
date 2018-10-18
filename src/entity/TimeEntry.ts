import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Workspace } from "./Workspace";

@Entity()
export class TimeEntry {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.timeEntries)
  user: User;

  @Column({nullable: true})
  projectId: number;

  @ManyToOne(type => Project, project => project.timeEntries, { nullable: true })
  project: Project;

  @Column()
  workspaceId: number;

  @ManyToOne(type => Workspace, workspace => workspace.timeEntries)
  workspace: Workspace;

  @Column({ nullable: true })
  description: string;

  @Column()
  startedAt: string;

  @Column({nullable: true})
  stoppedAt: string;

  @Column({ nullable: false, default: false })
  billable: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}