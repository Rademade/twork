import * as _ from "lodash";
import Vue from "vue";

export const SET_USERS = "SET_USERS";
export const SET_FILTER = "SET_FILTER";
export const SET_REPORT_DATA = "SET_REPORT_DATA";

export const WORKSPACES_ENDPOINT = "/workspaces";
export const REPORTS_ENDPOINT = "/reports";

const state = {
  users: [],
  reportFilter: {
    team: [],
    projects: [],
    billable: null,
    dateRange: {
      start: null,
      end: null
    }
  },
  reportGrouping: {
    groupBy: null,
    subgroupBy: null
  },
  reportData: null
};

const mutations = {
  [SET_USERS](state, users) {
    state.users = users
  },
  [SET_FILTER](state, reportFilter) {
    state.reportFilter = reportFilter
  },
  [SET_REPORT_DATA](state, reportData) {
    state.reportData = reportData;
  }
};

const getters = {
  users(state) {
    return state.users
  },
  reportFilter(state) {
    return state.reportFilter;
  },
  reportGrouping(state) {
    return state.reportGrouping;
  },
  reportData(state) {
    return state.reportData;
  }
};

const actions = {
  async fetchWorkspaceUsers({ commit, state, rootGetters }) {
    let currentWorkspaceId = rootGetters["auth/currentWorkspaceId"]
    const usersResp = await Vue.axios.get(`${WORKSPACES_ENDPOINT}/${currentWorkspaceId}/users`)
    commit(SET_USERS, usersResp.data);
  },
  async fetchSummaryReportWIthFilter({ commit }, reportFilter) {
    commit(SET_FILTER, reportFilter);
    const preparedFilter = Object.assign(
      reportFilter,
      { start: reportFilter.dateRange.start, end: reportFilter.dateRange.end }
    )
    const reportResp = await Vue.axios.get(`${REPORTS_ENDPOINT}/summary`, { params: preparedFilter });
    commit(SET_REPORT_DATA, reportResp.data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

