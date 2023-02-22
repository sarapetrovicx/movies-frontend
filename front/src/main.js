import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueSocketIO from 'vue-socket.io';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';
import Embed from 'v-video-embed';
import SocketIO from 'socket.io-client'

// const socketConnection = SocketIO('http://127.0.0.1:4000')
Vue.use(Embed);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'ws://127.0.0.1:4000',
  vuex: {
      store,
      actionPrefix: 'socket_',
  }
}));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
