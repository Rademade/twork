import ApiServiceWithCache from "./ApiServiceWithCache";
const uuidv4 = require('uuid/v4');

export default class ApiServiceWithBackgroundSync extends ApiServiceWithCache {

  constructor(resourceName, cacheStore, syncStore) {
    super(resourceName, cacheStore);
    this.resourceSyncTaskName = syncStore.getName();
    this.resourceSyncStore = syncStore
  }

  async post(createData) {
    let createDataWithId = { ...createData, id: uuidv4() };
    if (navigator.onLine) {
      await super.post(createDataWithId);
    } else {
      createDataWithId.unsynced = true;
      await this.cacheStore.write(createDataWithId);
      await this.registerSyncTaskWithOperationsSyncronozation(createDataWithId, 'create');
    }
    return createDataWithId;
  }

  async put(id, updateData) {
    let updatedData = {...updateData, id: id };
    if (navigator.onLine) {
      await super.put(id, updatedData);
    } else {
      updatedData.unsynced = true;
      await this.cacheStore.write(updatedData);
      await this.registerSyncTaskWithOperationsSyncronozation(updatedData, 'update');
    }
    return updatedData;
  }

  async delete(id) {
    if (navigator.onLine) {
      await super.delete(id);
    } else {
      await this.cacheStore.delete(id);
      await this.registerSyncTaskWithOperationsSyncronozation({ id: id }, 'delete');
    }
    return id;
  }

  async registerSyncTaskWithOperationsSyncronozation(data, operationType) {
    let taskRecord = { id: data.id, data: data, operationType: null };
    const sw = await navigator.serviceWorker.ready;
    switch (operationType) {
      case 'create': {
        taskRecord.operationType = 'create';
        await this.resourceSyncStore.write(taskRecord);
        sw.sync.register(this.resourceSyncTaskName);
        break;
      }
      case 'update': {
        const lastTaskRecord = await this.resourceSyncStore.read(data.id);
        if (lastTaskRecord && lastTaskRecord.operationType === 'create') {
          taskRecord.operationType = 'create';
        } else {
          taskRecord.operationType = 'update';
        }
        await this.resourceSyncStore.write(taskRecord);
        sw.sync.register(this.resourceSyncTaskName);
        break;
      }
      case 'delete': {
        const lastTaskRecord = await this.resourceSyncStore.read(data.id);
        if (lastTaskRecord && lastTaskRecord.operationType == 'create') {
          await this.resourceSyncStore.delete(taskRecord.id);
        } else {
          taskRecord.operationType = 'delete';
          await this.resourceSyncStore.write(taskRecord);
          sw.sync.register(this.resourceSyncTaskName);
        }
        break;
      }
      default:
        break;
    }
  }
}