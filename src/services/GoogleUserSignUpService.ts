
import User from "../models/User.model";
import Workspace from "../models/Workspace.model";
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
    // this.validateRademadeUser();
    await database.transaction(async _ => {
      const user = await this.user.save();
      const workspace = await this.getDefaultWorkspace();
      if (workspace.users) {
        workspace.users.push(user);
      } else {
        workspace.users = [user];
      }
      await workspace.save();
    });
    return this.user;
  }

  private validateRademadeUser() {
    const userEmalDomain = this.user.email.split("@")[1];
    if (userEmalDomain != "rademade.com") {
      throw new Error("Only for rademade users");
    }
  }
  private async getDefaultWorkspace(): Promise<Workspace> {
    let workspace = await Workspace.findOne();
    if (!workspace) {
      workspace = await new Workspace({name: "Rademade"}).save();
    }
    return workspace;
  }

}