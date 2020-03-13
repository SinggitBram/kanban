import VModal from 'vue-js-modal'
import Vue from 'vue'
import App from './app.vue'

Vue.use(VModal)

new Vue({

    render: h => h(App)
}).$mount('#app')