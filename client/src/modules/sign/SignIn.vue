<template>
  <div class="sign">
    <div class="sign">
      <header class="sign-header">
        <span class="sign-header__logo">TWORK</span>
        <sub class="sign-header__tagline"> by Rademade</sub>
      </header>
      <div class="sign__content">
        <div class="sign__form">
          <p class="sign__title">You are almost there!</p>
          <v-btn
          class="green-darken-1 mt-5"
          light
          outline
          large
          :href="googleAuthProviderLink"
          @click="$router.push('/sign/in')"
          >
            <v-icon class="pr-2">fab fa-google</v-icon>
            Authorize with Google
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import configs from "@/configs";
  import google from "@/assets/google.svg";

  export default {
    name: 'SignIn',
    data() {
      return {
        googleAuthProviderLink: configs.googleAuthProviderLink,
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .sign-header {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 0 30px;
    background-color: #fff;
    user-select: none;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
  }

  .sign-header__logo {
    display: block;
    font-size: 1.7rem;
    font-weight: 700;
    color: #263238;
    line-height: 1;
  }

  .sign-header__tagline {
    font-size: 0.7rem;
    color: #263238;
    padding-left: 5px;
  }


  .sign__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 70px); /* 70px header height */
    padding: 15vh 30px 30px 30px;
    text-align: center;
    box-sizing: border-box;
  }


  .sign__form {
    display: inline-block;
    width: 100%;
    max-width: 500px;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 2px 40px 0 rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
  }

  @media all and (max-width: 500px) {
    .sign__form {
      padding: 16px;
    }
  }

  .sign__title {
    margin-bottom: 50px;
    font-size: 35px;
    line-height: 1.2;
  }

  @media all and (max-width: 500px) {
    .sign__title {
      font-size: 24px;
    }
  }

</style>
