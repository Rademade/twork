import { SET_PROJECTS, DELETE, ADD, UPDATE } from "./types";

import actions from './actions';
import Project from "../Project";
import * as _ from "lodash";

const state = {
  projects: []
}

const mutations = {
  [SET_PROJECTS] (state, projects) {
    state.projects = projects;
  },
  [DELETE] (state, projectId) {
    const index = _.findIndex(state.projects, { id: projectId });
    state.projects.splice(index, 1);
  },
  [ADD] (state, project) {
    state.projects.unshift(new Project(project))
  },
  [UPDATE] (state, project) {
    const index = _.findIndex(state.projects, { id: project.id });
    state.projects.splice(index, 1, project);
  }
}

const getters = {
  projects: function(state) {
    return _.map(state.projects, projectObj => new Project(projectObj))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
