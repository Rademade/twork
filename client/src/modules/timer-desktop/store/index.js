import {
  SET_TIME_ENTRIES,
  UPDATE_TIME_ENTRY,
  DELETE_TIME_ENTRY,
  ADD_TIME_ENTRY
} from "./types";

import actions from './actions';
import * as _ from "lodash";
import TimeEntry from "../TimeEntry";

const state = {
  timeEntries: null,
  emptyTimeEntry: TimeEntry.buildEmpty()
}

const mutations = {
  [SET_TIME_ENTRIES](state, timeEntries) {
    state.timeEntries = timeEntries;
  },
  [ADD_TIME_ENTRY](state, timeEntry) {
    state.timeEntries.unshift(timeEntry);
  },
  [UPDATE_TIME_ENTRY](state, timeEntry) {
    const index = _.findIndex(state.timeEntries, { id: timeEntry.id });
    state.timeEntries.splice(index, 1, timeEntry);
  },
  [DELETE_TIME_ENTRY](state, timeEntryId) {
    const index = _.findIndex(state.timeEntries, {
      id: timeEntryId
    });
    state.timeEntries.splice(index, 1);
  }
}


const getters = {
  timeEntries() {
    if (state.timeEntries == null) { return null }
    return _.map(state.timeEntries, timeEntry => new TimeEntry(timeEntry));
  },
  stoppedTimeEntries(state) {
    return _.map(
            _.orderBy(
              _.filter(
                state.timeEntries,
                timeEntry => timeEntry.stoppedAt
              ),
              timeEntry => new Date(timeEntry.startedAt),
              'desc'
            ),
            timeEntry => new TimeEntry(timeEntry)
          )
  },
  activeTimeEntry(state) {
    const activeTimeEntry = _.find(state.timeEntries, timeEntry => !timeEntry.stoppedAt);
    return activeTimeEntry && new TimeEntry(activeTimeEntry) || state.emptyTimeEntry;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
