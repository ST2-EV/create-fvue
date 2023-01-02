import { createApp, computed, ref } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from "pinia";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/credentials"

let app;
// mount app after firebase is initialised
onAuthStateChanged(auth, (user) => {
    if (!app){
        app = createApp(App)
        let pinia = createPinia();
        app.use(pinia)
        app.use(router)
        app.mount("#app");
    }
});


