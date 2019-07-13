const KEYVAL_STORE_NAME = 'keyval-store';
const KEYVAL_OBJECT = 'keyval';

const dbPromise = self.idb.open(KEYVAL_STORE_NAME, 1, db => {
  if (!db.objectStoreNames.contains(KEYVAL_OBJECT)) {
    db.createObjectStore(KEYVAL_OBJECT)
  }
});

class IdbKeyVal {
  get(key) {
    return dbPromise.then(db => {
      return db.transaction(KEYVAL_OBJECT)
        .objectStore(KEYVAL_OBJECT).get(key);
    });
  }
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction(KEYVAL_OBJECT, 'readwrite');
      tx.objectStore(KEYVAL_OBJECT).put(val, key);
      return tx.complete;
    });
  }
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction(KEYVAL_OBJECT, 'readwrite');
      tx.objectStore(KEYVAL_OBJECT).delete(key);
      return tx.complete;
    });
  }
  clear() {
    return dbPromise.then(db => {
      const tx = db.transaction(KEYVAL_OBJECT, 'readwrite');
      tx.objectStore(KEYVAL_OBJECT).clear();
      return tx.complete;
    });
  }
  keys() {
    return dbPromise.then(db => {
      const tx = db.transaction(KEYVAL_OBJECT);
      const keys = [];
      const store = tx.objectStore(KEYVAL_OBJECT);
      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.complete.then(() => keys);
    });
  }
}

const  keyValStore = new IdbKeyVal();

var TWORK_INDEXEDDB_GLOBAL_STORE_NAME = 'twork-store';

var TIME_ENTIRES_STORE = 'time-entries';
var SYNC_TIME_ENTRIES_STORE = 'sync-time-entries';


var TWORK_OBJECT_STORE_NAMES = [
  TIME_ENTIRES_STORE,
  SYNC_TIME_ENTRIES_STORE
]

class TworkIndexedDBStore {
  static initStores() {
    return self.idb.open(TWORK_INDEXEDDB_GLOBAL_STORE_NAME, 1, (db) => {
      TWORK_OBJECT_STORE_NAMES.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, {
            keyPath: 'id'
          })
        }
      });
    })
  }

  constructor(objectStoreName) {
    if (!TWORK_OBJECT_STORE_NAMES.find(storeName => storeName === objectStoreName)) {
      throw objectStoreName + ' should be added to the initialization list inside TworkIndexedDBStore'
    }
    this.objectStoreName = objectStoreName;
  }

  getName() {
    return this.objectStoreName;
  }

  async write(data) {
    // eslint-disable-next-line no-undef
    const db = await idb.open(TWORK_INDEXEDDB_GLOBAL_STORE_NAME);
    let tx = db.transaction(this.objectStoreName, 'readwrite');
    let store = tx.objectStore(this.objectStoreName);
    await store.put(data);
    return tx.complete;
  }

  async read(id) {
    try {
      // eslint-disable-next-line no-undef
      const db = await idb.open(TWORK_INDEXEDDB_GLOBAL_STORE_NAME);
      let tx = db.transaction(this.objectStoreName, 'readonly');
      let store = tx.objectStore(this.objectStoreName);
      return store.get(id);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      // eslint-disable-next-line no-undef
      const db = await idb.open(TWORK_INDEXEDDB_GLOBAL_STORE_NAME);
      let tx = db.transaction(this.objectStoreName, 'readwrite');
      let store = tx.objectStore(this.objectStoreName);
      store.delete(id);
      return tx.complete;
    } catch (error) {
      console.log(error);
    }
  }

  async readAllData() {
    try {
      // eslint-disable-next-line no-undef
      const db = await idb.open(TWORK_INDEXEDDB_GLOBAL_STORE_NAME);
      let tx = db.transaction(this.objectStoreName, 'readonly');
      let store = tx.objectStore(this.objectStoreName);
      return store.getAll();
    } catch (error) {
      console.log(error);
    }
  }
}

class ApiService {
  constructor(resourceName) {
    this.resourceName = resourceName;
    this.basePath = '/api/v1' + resourceName;
  }

  async get() {
    try {
      const headers = await this.requestHeaders();
      const resp = await fetch(this.basePath, { headers: headers });
      return await resp.json();
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
        this.basePath + '/' + id,
        {
          method: 'DELETE',
          body: JSON.stringify(params),
          headers: headers
        }
      );
      return await resp.json();
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

class ApiServiceWithCache extends ApiService{
  constructor(resourceName, cacheStore) {
    super(resourceName);
    this.cacheStore = cacheStore;
  }

  async get() {
    try {
      let dataArray = await super.get();
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
    let data = await super.post(createData);
    data.unsynced = false;
    this.cacheStore.write(data)
    return data;
  }

  async put(id, updateData) {
    let data = await super.put(id, updateData);
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

const TIME_ENTRY_API_PATH = '/time_entries';
const TIME_ENTRIES_STORE_NAME = 'time-entries';

const timeEntriesStore = new TworkIndexedDBStore(TIME_ENTRIES_STORE_NAME);
const timeEntryApi = new ApiServiceWithCache(TIME_ENTRY_API_PATH, timeEntriesStore);

const syncTimeEntiriesStore = new TworkIndexedDBStore(SYNC_TIME_ENTRIES_STORE);

const handleTimeEntrySyncEvent = function () {
  return syncTimeEntiriesStore.readAllData().then((data) => {
    const itemsCount = data.length;
    data.forEach((timeEntry) =>  {
      let promise = null;
      switch (timeEntry.operationType) {
        case 'create': {
          promise = timeEntryApi.post(timeEntry.data);
          break;
        }
        case 'update': {
          promise = timeEntryApi.put(timeEntry.id, timeEntry.data);
          break;
        }
        case 'delete': {
          promise = timeEntryApi.delete(timeEntry.id);
          break;
        }
      }
      return promise.then(() => syncTimeEntiriesStore.delete(timeEntry.id))
    })
    return itemsCount;
  })
}

if ('SyncManager' in self) {
  self.addEventListener('sync', function (event) {
    if (event.tag == syncTimeEntiriesStore.getName()) {
      event.waitUntil(
        TworkIndexedDBStore.initStores().then(function () {
          return handleTimeEntrySyncEvent().then((itemsCount) => {
            self.postMessage('synced:' + itemsCount, 'http://localhost:8080')
          });
        })
      )
    }
  })
}
