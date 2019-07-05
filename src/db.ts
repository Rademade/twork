import { Sequelize, ISequelizeConfig } from "sequelize-typescript";
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

const urlObj: any = new URL(config.databaseUrl);
console.log(urlObj);

const sequlizeConfig: ISequelizeConfig = {
  host: urlObj.hostname,
  port: parseInt(urlObj.port),
  database: urlObj.pathname.split("/")[1],
  password: urlObj.password,
  username: urlObj.username,
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
};

const connection = new Sequelize(sequlizeConfig);

connection.addModels([User, Subscription, TimeEntry, Project, Workspace, WorkspaceUser]);

export default connection;

