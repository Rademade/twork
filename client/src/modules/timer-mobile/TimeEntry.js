import moment from "moment";

// eslint-disable-next-line no-unused-vars
import * as moment_format from "moment-duration-format";


export default class TimeEntry {
  static buildEmpty() {
    return new TimeEntry(
      {
        startedAt: null,
        stoppedAt: null,
        description: '',
        project: null,
        billable: false
      }
    );
  }

  constructor(json) {
    Object.assign(this, json)
  }

  isStarted() { return !!this.startedAt }
  isStopped() { return this.isStarted() && !!this.stoppedAt }
  startedAtTime() { return moment(this.startedAt).format('hh:mm A') }
  stoppedAtTime() { return moment(this.stoppedAt).format('hh:mm A') }
  unixTimestamp() { return moment(this.stoppedAt).format('X') }
  date() { return moment(this.stoppedAt).format('YYYY-MM-DD') }

  duration() { return moment.duration(moment(this.stoppedAt) - moment(this.startedAt)) }
  getDurationText() {
    return this.duration().format("hh:mm:ss", { trim: false })
  }

}
