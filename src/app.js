// public css
require("./css/animate.css");
require("./css/main.css");
require("./css/map-dialog-modal.css");

// public js
import public_function from './js/public-function.js';

import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import filter from './filter'
import store from './store'

// components
import App from './components/App.vue'
import GamePackage from './components/game-package.vue'
import GameHouse from './components/game-house.vue'
import GameProgress from './components/game-progress.vue'
import GameSkillItem from './components/game-skill-item.vue'
import GameStateItem from './components/game-state-item.vue'
import ComponentItem from './components/component-item.vue'

Vue.component('App', App)
Vue.component('game-package', GamePackage)
Vue.component('game-house', GameHouse)
Vue.component('game-progress', GameProgress)
Vue.component('game-skill-item', GameSkillItem)
Vue.component('game-state-item', GameStateItem)
Vue.component('component-item', ComponentItem)

const app = new Vue({
  store,
  router,
  template: `<App/>`
}).$mount('#app')
