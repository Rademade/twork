<template>
  <p>Succeess</p>
</template>

<script>
  import userAuthService from '@/core/services/userAuthService';

  export default {
    mounted() {
      const token = this.$route.query.token;
      console.log(userAuthService);

      userAuthService.setToken(token).then( () => {
        userAuthService.fetchUser().then(()=> this.$router.push({name: "timer"}))
      })
    }
  }
</script>