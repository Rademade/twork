import { AppRequest, AppResponse } from "../interfaces";
import { User } from "../entity/User";
import { Workspace } from "../entity/Workspace";
import { getRepository } from "typeorm";

export const workspaceUsers = async function (req: AppRequest, res: AppResponse) {
  try {
    const workspace = await Workspace.findOne({ where: { id: req.params.id }, relations: ["users"] });
    res.status(200).json(workspace.users);
  } catch (error) {
    res.status(400).json(error);
  }
};