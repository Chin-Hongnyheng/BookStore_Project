import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faCircleUser as farCircleUser} from '@fortawesome/free-regular-svg-icons'
import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

library.add(faMagnifyingGlass, faShoppingCart, farHeart, farCircleUser, farEnvelope, faFacebook, faYoutube, faTwitter, faInstagram, faStar, faStarHalfAlt, faArrowLeft, faArrowRight )
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.mount('#app')
