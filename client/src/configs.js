export default {
  apiPrefix: "/api/v1",
  googleAuthProviderLink: process.env.VUE_APP_GOOGLE_AUTH_PROVIDER_LINK,
  isProduction: process.env.NODE_ENV == 'production',
  WebPushVapidPublicKey: process.env.VUE_APP_WEB_PUSH_VAPID_PUBLIC_KEY
};
