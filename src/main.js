// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.css'
import './assets/css/font/iconfont.css'
import './assets/css/font/iconfont.eot'
import './assets/css/font/iconfont.ttf'
import './assets/css/font/iconfont.svg'
import moment from 'moment'
import echarts from 'echarts'
import Store from './store/index'
import BaiduMap from 'vue-baidu-map'
import axios from './assets/js/uniteaxios'
import Vuejsonp from 'vue-jsonp'
import qs from 'qs'
import md5 from 'js-md5';
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: '1IGwblSXzAV0yxzCq0ZGdYoixoreCQwS'
})
Vue.prototype.$echarts = echarts
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)

})
Vue.prototype.$qs = qs;

Vue.config.debug = true;
Vue.use(Vuejsonp)
Vue.use(ElementUI);
Vue.use(axios)
Vue.use(SlideVerify)
/* eslint-disable no-new */
new Vue({
  store:Store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
