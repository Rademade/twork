<template>
  <v-app id="inspire">
        <v-img src="/img/background.jpg" style="height:100vh">
            <v-layout
              column
              align-center
              justify-center
              class="white--text home_content"
              height="100%"
            >
              <h1 class="mb-2 display-3 text-xs-center font-weight-bold">TWORK</h1>
              <div class="headline mb-3 text-xs-center">by Rademade</div>
              <v-btn
                class="green-darken-1 mt-5"
                dark
                outline
                large
                @click="$router.push('/sign/in')"
              >
                Get Started
              </v-btn>
            </v-layout>
        </v-img>
  </v-app>
</template>

<script>
  import userAuthService from "@/core/services/userAuthService";

  export default {
    name: "Home",
    data: function () {
      return {
        isUserLoggedIn: null
      }
    },
    async created() {
      this.isUserLoggedIn = await userAuthService.getToken();
    }
  }
</script>

<style scoped>
.home_content {
  height: 100%;
}

</style>
