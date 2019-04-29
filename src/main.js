import Vue from 'vue'
import VTooltip from 'v-tooltip'
import App from './App.vue'
import VueResource from 'vue-resource'
import './assets/global.less'

Vue.use(VTooltip);
Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
    render: h => h(App),
}).$mount('#app');
