
import { User } from "../entity/User";
import { Workspace } from "../entity/Workspace";
import { getRepository, getManager, Repository } from "typeorm";

export  default class GoogleUserSignUpService {
  private user: User = new User();
  private userRepo: Repository<User> = getRepository(User);
  private workspaceRepo: Repository<Workspace> = getRepository(Workspace);

  constructor(googleProfile: any) {
    this.user.googleId = googleProfile.id;
    this.user.name = googleProfile.displayName;
    this.user.email = googleProfile.emails[0].value;
    this.user.imgUrl = googleProfile.photos[0].value;
  }

  public async signUp(): Promise<User> {
    // this.validateRademadeUser();
    await getManager().transaction(async transactionManger => {
      const user = await this.userRepo.save(this.user);
      const workspace = await this.getDefaultWorkspace();
      workspace.users.push(user);
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
    const workspaceList = await this.workspaceRepo.find({ take: 1 , relations: ["users"]});
    let workspace = workspaceList[0];
    if (workspace) { return workspace; }
    workspace = new Workspace();
    workspace.name = "Rademade";
    return await this.workspaceRepo.save(workspace);
  }

}