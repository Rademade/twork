import { Repository, EntityRepository } from "typeorm";
import { Workspace } from "../entity/Workspace";


@EntityRepository(Workspace)
export class WorkspaceRepository extends Repository<Workspace> {
  default(): Promise<Workspace> {
    return this.findOne({name: "Rademade"});
  }
}