import ApiService from "@/core/services/ApiService";
import ApiServiceWithCache from "@/core/services/ApiServiceWithCache";
import ApiServiceWithBackgroundSync from "@/core/services/ApiServiceWithBackgroundSync";
import configs from "@/configs";
import TworkIndexedDBStore, { TIME_ENTRIES_STORE_NAME, SYNC_TIME_ENTRIES_STORE_NAME } from "@/core/services/TworkIndexedDBStore";

const TIME_ENTRY_API_PATH = '/users/me/time_entries';

const timeEntryApiService = (function() {
  if (('indexedDB' in window) && configs.isProduction) {
    const timeEntriesStore = new TworkIndexedDBStore(TIME_ENTRIES_STORE_NAME);
    // Use background sync only for Chrome and AndroidChrome for now
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const timeEntriesSyncStore = new TworkIndexedDBStore(SYNC_TIME_ENTRIES_STORE_NAME);
      return new ApiServiceWithBackgroundSync(TIME_ENTRY_API_PATH, timeEntriesStore, timeEntriesSyncStore);
    } else {
      return new ApiServiceWithCache(TIME_ENTRY_API_PATH, timeEntriesStore);
    }
  } else {
    return new ApiService(TIME_ENTRY_API_PATH);
  }
}());

export default timeEntryApiService;