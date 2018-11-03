import { Sequelize } from "sequelize-typescript";
import config from "./config";
import cls from "continuation-local-storage";

import {
  Subscription,
  User,
  TimeEntry,
  Project,
  Workspace,
  WorkspaceUser
} from "./models";

const namespace = cls.createNamespace("twork-namespace");
Sequelize.useCLS(namespace);

const connection = new Sequelize(config.databaseUrl);

connection.addModels([User, Subscription, TimeEntry, Project, Workspace, WorkspaceUser]);

export default connection;

