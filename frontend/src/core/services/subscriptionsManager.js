import ApiService from "./ApiService";
import configs from "@/configs";

const urlBase64ToUint8Array = function (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const convertedVapidKey = urlBase64ToUint8Array(configs.WebPushVapidPublicKey);

class SubscriptionsManager {
  constructor() {
    this.convertedVapidKey = convertedVapidKey;
    this.subscriptionsApi = new ApiService("/subscriptions");
  }

  async createSubscription() {
    try {
      console.log('Creating subscription');
      const registration = await navigator.serviceWorker.ready;
      console.log('Registration', registration);
      const registrationInfo = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
      console.log('RegistrationInfo', registrationInfo);
      const resp = await this.subscriptionsApi.post(registrationInfo);
      console.log('Registration repo', resp);
      return resp;
    } catch (error) {
      console.log('[Subscription] ', error);

    }
  }
}

export default new SubscriptionsManager();