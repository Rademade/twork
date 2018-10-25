import moment from "moment";

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
  unixTimestamp() { return moment(this.stoppedAt).format('X') }
  startedAtTime() { return this.startedAt && moment(this.startedAt).format('hh:mm A') }
  startedAtTime24() { return this.startedAt && moment(this.startedAt).format('HH:MM') }
  stoppedAtTime() { return this.stoppedAt && moment(this.stoppedAt).format('hh:mm A') }
  stoppedAtTime24() { return this.stoppedAt && moment(this.stoppedAt).format('HH:MM') }
  startDate() { return this.startedAt && moment(this.startedAt).format('YYYY-MM-DD') }
  stopDate() { return this.stoppedAt && moment(this.stoppedAt).format('YYYY-MM-DD') }
  duration() {
    return moment.duration(moment(this.stoppedAt) - moment(this.startedAt));
  }
  getDurationText() {
    return this.duration().format("hh:mm:ss", { trim: false })
  }
}
