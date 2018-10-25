import keyValStore from './keyValStore';
import ApiService from './ApiService';

const AUTH_TOKEN_KEY = 'auth-token';

class UserAuthService {
  constructor() {
    this.currentUser = null;
    this.currentWorkspaceId = null;
    this.userApiService = new ApiService('/users/me');
  }

  login() {
    return this.fetchUser();
  }

  logout() {
    this.currentUser = null;
    return keyValStore.delete(AUTH_TOKEN_KEY);
  }

  async fetchUser() {
    const token = await this.getToken();
    if (token) {
      let user = await this.userApiService.getAll();
      this.setUser(user);
    } else {
      throw 'User is not authentificated'
    }
  }

  setUser(user) {
    this.currentUser = user;
  }

  getCurrentWorkspaceId() {
    return this.currentUser.workspaces[0].id;
  }

  setToken(token) {
    return keyValStore.set(AUTH_TOKEN_KEY, token);
  }

  getToken() {
    return keyValStore.get(AUTH_TOKEN_KEY);
  }
}
const userAuthService = new UserAuthService();
export default userAuthService;
