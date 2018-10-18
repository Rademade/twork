import {
  SET_PROJECTS,
  DELETE,
  ADD,
  UPDATE
} from "./types";

import ApiService from "@/core/services/ApiService";
import userAuthService from '@/core/services/userAuthService';

const projectsApiService = new ApiService("/users/me/projects");

export default {
  async fetchProjects(context) {
    const projects = await projectsApiService.get();
    context.commit(SET_PROJECTS, projects);
  },

  async deleteProject(context, projectId) {
    const data = await projectsApiService.delete(
      projectId,
      { workspaceId: userAuthService.getCurrentWorkspaceId() }
    )
    context.commit(DELETE, data.id);
  },

  async createProject(context, project) {
    const projectWithWorkspace = { ...project, workspaceId: userAuthService.getCurrentWorkspaceId() }
    const data = await projectsApiService.post(projectWithWorkspace)
    context.commit(ADD, data);
  },

  async updateProject(context, project) {
    const data = await projectsApiService.put(project.id, project)
    context.commit(UPDATE, data);
  }
}
