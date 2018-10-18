import idb from 'idb';

export const TWORK_INDEXEDDB_GLOBAL_STORE_NAME = 'twork-store';

export const TIME_ENTRIES_STORE_NAME = 'time-entries';
export const SYNC_TIME_ENTRIES_STORE_NAME = 'sync-time-entries';

const TWORK_OBJECT_STORE_NAMES = [
  TIME_ENTRIES_STORE_NAME,
  SYNC_TIME_ENTRIES_STORE_NAME
]

class TworkIndexedDBStore {
  static initStores() {
    return idb.open(TWORK_INDEXEDDB_GLOBAL_STORE_NAME, 1, (db) => {
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
    const db = await idb.open(TWORK_INDEXEDDB_GLOBAL_STORE_NAME);
    let tx = db.transaction(this.objectStoreName, 'readwrite');
    let store = tx.objectStore(this.objectStoreName);
    await store.put(data);
    return tx.complete;
  }

  async read(id) {
    try {
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
      const db = await this.init();
      let tx = db.transaction(this.objectStoreName, 'readonly');
      let store = tx.objectStore(this.objectStoreName);
      return store.getAll();
    } catch (error) {
      console.log(error);
    }
  }
}

export default TworkIndexedDBStore;