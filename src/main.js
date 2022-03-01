import Vue from 'vue';
import app from './app.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import './assets/style/main.scss';

Vue.config.productionTip = false;

Vue.directive('rainbow', {
  inserted(el) {
    el.style.color = getRandomColor();
  }
});

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted(el) {
    el.focus();
  }
});
// v-customOn:click="doIt"
Vue.directive('customOn', {
  bind(el, binding) {
    console.log(binding);
    const type = binding.arg;
    const fn = binding.value;
    el.addEventListener(type, fn);
  }
});

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');



function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}