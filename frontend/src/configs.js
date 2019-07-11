export default {
  apiPrefix: "/api/v1",
  googleAuthProviderLink: '/api/v1/auth/google',
  isProduction: process.env.NODE_ENV == 'production',
  WebPushVapidPublicKey: process.env.VUE_APP_WEB_PUSH_VAPID_PUBLIC_KEY
};
