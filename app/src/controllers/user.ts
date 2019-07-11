import { AppRequest, AppResponse } from "../interfaces";
import { User, Workspace } from "../models";

export const me = async function (req: AppRequest, res: AppResponse) {
  try {
    const user = await User.findOne({
      where: {id: req.user.id },
      include: [{
        model: Workspace,
        attributes: ["id", "name"]
      }],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};