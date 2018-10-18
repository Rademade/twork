import idb from 'idb';

const KEYVAL_STORE_NAME = 'keyval-store';
const KEYVAL_OBJECT = 'keyval';

const dbPromise = idb.open(KEYVAL_STORE_NAME, 1, db => {
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

const idbKeyval = new IdbKeyVal();
export default idbKeyval;