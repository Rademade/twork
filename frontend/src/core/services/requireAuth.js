import userAuthService from './userAuthService';

const requireAuth = async (to, from, next) => {
  console.log('Auth checked!');

  try {
    if (userAuthService.currentUser) {
      return next();
    } else {
      const token = await userAuthService.getToken();
      if (token) {
        await userAuthService.fetchUser();
        return next()
      } else {
        return next("/sign/in");
      }
    }
  } catch (error) {
    console.log(error);
    return next("/sign/in");
  }
};

export default requireAuth;

