/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Global CSS (Tailwind)
import './index.css'

// Pinia Store
import { createPinia } from 'pinia'
const pinia = createPinia()

// Vue Tippy
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/themes/light.css'
import 'tippy.js/dist/tippy.css'
const vueTippyOptions = {
    directive: 'tippy',
    component: 'tippy',
    componentSingleton: 'tippy-singleton',
    defaultProps: { placement: 'auto-end', allowHTML: true, theme: 'light' },
};

// Toastr
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
    position: "bottom-center",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
};

createApp(App)
    .use(VueTippy, vueTippyOptions)
    .use(pinia)
    .use(router)
    .use(Toast, options)
    .mount('#app');