<script>
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/credentials"

export default {
  data() {
    return {
    }
  },
  methods: {
    signUserOut() {
      signOut(auth)
      .then(() => this.$router.push("/login"))
      .catch((error) => {
        console.log(error)
      });
    },
  },
}
</script>

<template>
  <button @click.prevent="signUserOut">logout</button>
</template>
