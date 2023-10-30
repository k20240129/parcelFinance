import { createApp, getCurrentInstance } from 'vue';
import Utils from '@/utils/Utils';
// import UnderlineText from '@/components/UnderlineText/UnderlineText.vue';
// import registerGlobalComponents from '@/utils/computes';
import directives from '@/utils/directive/index';
import vnatRegister from '@/utils/vant/index';
import i18n from '@/lang/index';
import App from './App.vue';
import AppLoading from './components/common/AppLoading.vue';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import { setupAssets } from './plugins';
import { setupStore } from './store';
import './styles/scss/index.scss'; // global css
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
// 2. 引入组件样式(vant)
import 'vant/lib/index.css';
import { ElLoading } from 'element-plus';
async function setupApp() {
  // import assets: js、css
  setupAssets();
  // app loading
  const appLoading = createApp(AppLoading);
  appLoading.mount('#appLoading');

  const app = createApp(App);
  app.config.globalProperties.$Utils = Utils;
  app.config.globalProperties.$loading = ElLoading.service;
  // 注册自定义指令
  Object.keys(directives).forEach(name => app.directive(name, directives[name]));
  // store plugin: pinia
  setupStore(app);
  // vue custom directives
  setupDirectives(app);
  // vant组件注册
  vnatRegister(app);
  // vue router
  await setupRouter(app);
  // 设置语言
  app.use(i18n);
  // mount app
  app.mount('#app');
}

setupApp();
