import { BaseEntity, Entity,  PrimaryGeneratedColumn,  Column,  CreateDateColumn,  UpdateDateColumn,  JoinTable,  ManyToOne,  OneToMany } from "typeorm";
import { Workspace } from "./Workspace";
import { TimeEntry } from "./TimeEntry";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workspaceId: number;

  @ManyToOne(type => Workspace, workspace => workspace.projects)
  workspace: Workspace;

  @OneToMany(type => TimeEntry, timeEntry => timeEntry.project)
  timeEntries: TimeEntry[];

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
