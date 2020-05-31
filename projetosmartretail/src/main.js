import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Shop from './components/Shop.vue';
import Carrinho from './components/Carrinho.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Shop },
    { path: '/Carrinho', component: Carrinho },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
