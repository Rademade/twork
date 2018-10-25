import ApiService from "./ApiService";

export default class ApiServiceWithCache extends ApiService{
  constructor(resourceName, cacheStore) {
    super(resourceName);
    this.cacheStore = cacheStore;
  }

  async getAll() {
    try {
      const dataArray = await super.getAll();
      dataArray.forEach((el) => {
        el.unsynced = false;
        this.cacheStore.write(el)
      });
      return dataArray;
    } catch (error) {
      return this.cacheStore.readAllData();
    }
  }

  async get(id) {
    try {
      let data = await super.get(id);
      data.unsynced = false;
      this.cacheStore.write(data);
      return data;
    } catch (error) {
      return this.cacheStore.read(id);
    }
  }


  async post(createData) {
    const data = await super.post(createData);
    data.unsynced = false;
    this.cacheStore.write(data)
    return data;
  }

  async put(id, updateData) {
    const data = await super.put(id, updateData);
    data.unsynced = false;
    this.cacheStore.write(data)
    return data;
  }

  async delete(id) {
    const data = await super.delete(id);
    this.cacheStore.delete(id)
    return data;
  }

}