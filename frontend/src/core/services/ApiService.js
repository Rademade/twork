import configs from "@/configs";
import fetch from "isomorphic-fetch";
import keyValStore from './keyValStore';

export default class ApiService {
  constructor(resourceName) {
    this.resourceName = resourceName;
    this.basePath = configs.apiPrefix + resourceName;
  }

  async getAll() {
    try {
      const headers = await this.requestHeaders();
      const resp = await fetch(this.basePath, {
        headers: headers
      });
      return await resp.json();
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    try {
      const headers = await this.requestHeaders();
      const resp = await fetch(this.basePath + '/' + id, { headers: headers });
      const respJson = await resp.json();
      console.log(respJson);
      return respJson;
    } catch (error) {
      console.log(error);
    }
  }

  async post(params = {}) {
    try {
      const headers = await this.requestHeaders();
      const resp = await fetch(
        this.basePath, {
          method: 'POST',
          body: JSON.stringify(params),
          headers: headers
        }
      );
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async put(id, params = {}) {
    try {
      const headers = await this.requestHeaders();
      const resp = await fetch(
        this.basePath + '/' + id, {
          method: 'PUT',
          body: JSON.stringify(params),
          headers: headers
        }
      );
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id, params = {}) {
    try {
      const headers = await this.requestHeaders();
      const resp = await fetch(
        this.basePath + '/' + id, {
          method: 'DELETE',
          body: JSON.stringify(params),
          headers: headers
        }
      );
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async requestHeaders() {
    const token = await keyValStore.get('auth-token');
    return {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json',
    }
  }

}
