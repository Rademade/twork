import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { TimeEntry } from "./TimeEntry";
import { Workspace } from "./Workspace";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    googleId: string;

    @Column()
    imgUrl: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(type => TimeEntry, timeEntry => timeEntry.user)
    timeEntries: TimeEntry[];

    @ManyToMany(type => Workspace, workspace => workspace.users)
    workspaces: Workspace[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}