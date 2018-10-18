import { AppRequest, AppResponse } from "../interfaces";
import { User } from "../entity/User";
import { Workspace } from "../entity/Workspace";
import { getRepository } from "typeorm";

export const me = async function (req: AppRequest, res: AppResponse) {
  try {
    const user = await getRepository(User).findOne({ where: { id: req.user.id }, relations: ["workspaces"]});
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};