import { Sequelize } from "sequelize-typescript";
import cls from "continuation-local-storage";
import Subscription from "./models/Subscription.model";

const namespace = cls.createNamespace("twork-namespace");
Sequelize.useCLS(namespace);

const postgresUri = "postgres://@localhost/twork_development";

const db = new Sequelize(postgresUri);

db.addModels([Subscription]);
export default db;