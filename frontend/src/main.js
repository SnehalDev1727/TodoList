import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';


// Import the FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core';

// Import the FontAwesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faTrash);

// Create the Vue app
const app = createApp(App);

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Mount the app
app.mount('#app');