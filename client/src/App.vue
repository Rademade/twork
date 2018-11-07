<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script>
import TworkIndexedDBStore, { TIME_ENTRIES_STORE_NAME, SYNC_TIME_ENTRIES_STORE_NAME } from "@/core/services/TworkIndexedDBStore";

export default  {
  created() {
    const timeEntriesSyncStore = new TworkIndexedDBStore('sync-time-entries');
    window.addEventListener('online', () => {
       alert("You are online!");
       const data = timeEntriesSyncStore.readAllData();
       alert(JSON.stringify(data));
    })
    window.addEventListener('offline', () => {
      alert("You are offline!");
      const data = timeEntriesSyncStore.readAllData();
      alert(JSON.stringify(data));
    })
  }
}
</script>

<style lang="postcss">
  h1, h2, h3, h4, h5, h6, p, ol, ul, li {
    margin: 0;
    padding: 0;
  }

  ul,ol,li {
    list-style-type: none;
  }

  button {
    outline: none;
    border: 0;
    background: none;
  }

  a {
    text-decoration: none;
  }

  html {
    height: 100%;
    min-height: 100%;
    height: auto !important;
    background: #fff;
    overflow-y: scroll;
    overflow-x: auto;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    -webkit-overflow-scrolling: touch;
    text-rendering: optimizeLegibility;
  }

  body {
    height: 100%;
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>