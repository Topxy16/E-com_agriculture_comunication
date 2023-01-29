
import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import './styles/main.scss'
import setAuthheader from './utils/setAuthheader'

if(localStorage.jwtToken) {
    setAuthheader(localStorage.jwtToken);
} else {
    setAuthheader(false);
}

const app = createApp(App)
registerPlugins(app)

app.mount('#app')