import * as _         from "lodash";
import userAuthService from '@/core/services/userAuthService';
import {
  SET_TIME_ENTRIES,
  UPDATE_TIME_ENTRY,
  DELETE_TIME_ENTRY,
  ADD_TIME_ENTRY,
  SET_CURRENT_TIME_ENTRY
} from "./types";

import timeEntryApiService from '../timeEntryApiService';

export default {
  async fetchTimeEntries({commit}) {
    const data = await timeEntryApiService.getAll();
    commit(SET_TIME_ENTRIES, data);
  },
  async fetchCurrentTimeEntry({commit, state}, id) {
    const data = await timeEntryApiService.get(id);
    commit(SET_CURRENT_TIME_ENTRY, data);
    return data;
  },
  async createTimeEntry({ commit }, timeEntry) {
    let newTimeEntry = Object.assign(timeEntry, {
      workspaceId: userAuthService.getCurrentWorkspaceId()
    });
    let data = await timeEntryApiService.post(newTimeEntry);
    commit(ADD_TIME_ENTRY, data);
    return data;
  },
  async updateTimeEntry({commit}, timeEntry) {
    const data = await timeEntryApiService.put(timeEntry.id, timeEntry);
    commit(UPDATE_TIME_ENTRY, data);
    return data;
  },
  async deleteTimeEntry(context, timeEntryId) {
    await timeEntryApiService.delete(timeEntryId);
    context.commit(DELETE_TIME_ENTRY, timeEntryId);
  }

}
