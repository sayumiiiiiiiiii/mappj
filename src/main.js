import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key:"AIzaSyCCdBMbyv2BWnzi0frpRk-exwW2qUDc6CU",
    libraries: "places", // necessary for places input
    region: 'JP',
    language: 'ja'
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
