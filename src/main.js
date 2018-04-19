import WebFont from 'webfontloader';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

WebFont.load({
  custom: {
    families: ['Source Sans Pro:n3,n4,n6,n7'],
    urls: ['/fonts/source-sans-pro.css']
  },
  active() {
    new Vue({
      render: h => h(App),
    }).$mount('#app');
  },
});
