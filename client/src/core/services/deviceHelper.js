class DeviceHelper {
  isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  }
}

export default new DeviceHelper();