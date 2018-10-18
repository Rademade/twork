export default class Project {
  static buildEmpty() {
    return new Project(
      {
        name: '',
        workspace: ''
      }
    );
  }

  constructor(json) {
    this.name = json.name;
    this.workspaceId = json.workspaceId;
    this.id = json.id
  }

  clone () { return new this.constructor(this); }
}
