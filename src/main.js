import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';
import BaseBadge from './components/base/BaseBadge.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseCard from './components/base/BaseCard.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';
import router from './routes';
import store from './store/index';

const BaseDialog = defineAsyncComponent(() =>
  import('./components/base/BaseDialog.vue')
);

createApp(App)
  .use(store)
  .use(router)
  .component('base-badge', BaseBadge)
  .component('base-button', BaseButton)
  .component('base-card', BaseCard)
  .component('base-dialog', BaseDialog)
  .component('base-spinner', BaseSpinner)
  .mount('#app');
