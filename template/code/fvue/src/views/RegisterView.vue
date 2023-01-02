<script>
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/credentials"
import { Users } from "../../firebase/schemas/User"
import { useUserStore } from '../stores/user.js'
import { mapStores } from 'pinia'

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    }
  },
  computed: {
		...mapStores(useUserStore)
	},
  methods: {
    createUser() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          this.userStore.setUser(await Users._docwithid({
            "email": this.email,
            // other fields as necessary (but dont forget to add them to firebase/schemas/User)
          }, userCredential.user.uid))
          this.$router.push("/home")
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<template>
  <div class="register-page">
      <form class="register-form">
        <input v-model="name" type="text" placeholder="name" />
        <input v-model="password" type="password" placeholder="password" />
        <input v-model="email" type="text" placeholder="email address" />
        <button @click.prevent="createUser">create</button>
        <p class="message">Already registered? <RouterLink to="/login">Sign In</RouterLink>
        </p>
      </form>
  </div>
</template>

<style scoped>
.register-form input{
  display: block;
}
.register-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  margin: 0 auto;
}
.register-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>