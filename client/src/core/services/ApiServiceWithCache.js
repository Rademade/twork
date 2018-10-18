import ApiService from "./ApiService";

export default class ApiServiceWithCache extends ApiService{
  constructor(resourceName, cacheStore) {
    super(resourceName);
    this.cacheStore = cacheStore;
  }

  async get() {
    try {
      const dataArray = await super.get();
      dataArray.forEach((el) => {
        el.unsynced = false;
        this.cacheStore.write(el)
      });
      return dataArray;
    } catch (error) {
      return this.cacheStore.readAllData();
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