import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Lodash
import VueLodash from 'vue-lodash'
const options = { name: 'lodash' }
Vue.use(VueLodash, options)

// Modal
import VModal from 'vue-js-modal'
Vue.use(VModal)

// Font Awesome
require('./fontAwesome.js');
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)


// require('./assets/scss/app_old.scss');
require('./assets/scss/app.scss');

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
