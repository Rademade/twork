<template>
  <div class="sign">
    <header class="sign-header">
      <span class="sign-header__logo">TWork</span>
    </header>
    <div class="sign__content">
      <p class="sign__title">Be more effective today!</p>
      <div class="sign__form">
        <router-link class="sign__button sign__button--icon" to="signin" v-if="!isUserLoggedIn">
          <svg class="sign__icon">
            <use xlink:href="#google"></use>
          </svg>
          Login with google
        </router-link>
        <router-link class="sign__button" to="timer" v-if="isUserLoggedIn">Go to timer</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import userAuthService from "@/core/services/userAuthService";

  export default {
    name: "Home",
    data: function () {
      return {
        isUserLoggedIn: !!userAuthService.currentUser
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
    font-size: 1.25rem;
    font-weight: 700;
    color: #1fc881;
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
  .sign__title {
    margin-bottom: 50px;
    font-size: 35px;
    line-height: 1.2;
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

  .sign__button {
    position: relative;
    display: inline-block;
    height: 50px;
    padding: 0 20px;
    font-size: 18px;
    line-height: 46px;
    color: #fff;
    border: 2px solid #2ec783;
    background-color: #2ec783;
    vertical-align: top;
    white-space: nowrap;
    cursor: pointer;
    outline: 0;
    transition: color .3s ease-in-out,background .3s ease-in-out;
    box-sizing: border-box;
    -webkit-appearance: none;

  }

  .sign__button--icon {
    padding-left: 50px;
  }

  .sign__icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 25px;
    height: 25px;
    fill: #fff;
    border-radius: 5px;
    transition: fill .3s ease
  }
</style>
