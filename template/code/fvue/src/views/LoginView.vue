<script>
import { RouterLink } from 'vue-router'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/credentials"

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    signInUser() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => this.$router.push("/home"))
        .catch((error) => console.log(error));
    }
  }
}
</script>

<template>
<div class="login-page">
    <form class="login-form">
      <input v-model="email" type="email" placeholder="email"/>
      <input v-model="password" type="password" placeholder="password"/>
      <button @click.prevent="signInUser">login</button>
      <p class="message">Not registered? <RouterLink to="/register">Create an account</RouterLink></p>
    </form>
</div>
</template>

<style scoped>
.login-form input{
  display: block;
}
.login-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  margin: 0 auto;
}
.login-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>