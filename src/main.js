import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao('bd85ec3da6fa6f5d2d2334495a6176e1');
createApp(App).use(router).mount('#app');

