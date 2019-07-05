
import { User, Workspace, WorkspaceUser } from "../models";
import database from "../db";


export  default class GoogleUserSignUpService {
  private user: User;

  constructor(googleProfile: any) {
    this.user = new User({
      googleId: googleProfile.id,
      name: googleProfile.displayName,
      email: googleProfile.emails[0].value,
      imgUrl: googleProfile.photos[0].value
    });
  }

  public async signUp(): Promise<User> {
    try {
      await database.transaction(async (_: any) => {
        const user = await this.user.save();
        const [workspace, ] = await Workspace.findOrCreate({where: {name: "Rademade"}});
        await new WorkspaceUser({userId: user.id, workspaceId: workspace.id}).save();
      });
      return this.user;
    } catch (error) {
      console.log(error);
    }
  }

  private validateRademadeUser() {
    const userEmalDomain = this.user.email.split("@")[1];
    if (userEmalDomain != "rademade.com") {
      throw new Error("Only for rademade users");
    }
  }
}