import { AppRequest, AppResponse } from "../interfaces";
import { User, Workspace } from "../models";

export const workspaceUsers = async function (req: AppRequest, res: AppResponse) {
  try {
    const workspace = await Workspace.findOne({
      where: {id: req.params.id},
      include: [{
        model: User,
        attributes: ["email", "name"]
      }]
    });
    res.status(200).json(workspace.users);
  } catch (error) {
    res.status(400).json(error);
  }
};