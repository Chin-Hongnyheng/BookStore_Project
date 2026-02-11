import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMagnifyingGlass,
  faShoppingCart,
  faStar,
  faStarHalfAlt,
  faArrowLeft,
  faArrowRight,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faTimes,
  faCheck,
  faChevronUp,
  faChevronDown,
  faBars,
  faTh,
  faList,
  faDashboard,
  faBook,
  faTag,
  faPercent,
  faBell,
  faUser,
  faSignOutAlt,
  faHome,
  faCalendar,
  faGift,
  faUsers,
  faEye,
  faDownload,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faCircleUser as farCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(
  faMagnifyingGlass,
  faShoppingCart,
  faStar,
  faStarHalfAlt,
  faArrowLeft,
  faArrowRight,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faTimes,
  faCheck,
  faChevronUp,
  faChevronDown,
  faBars,
  faTh,
  faList,
  faDashboard,
  faBook,
  faTag,
  faPercent,
  faBell,
  faUser,
  faSignOutAlt,
  faHome,
  faCalendar,
  faGift,
  faUsers,
  faEye,
  faDownload,
  farHeart,
  farCircleUser,
  farEnvelope,
  faFacebook,
  faYoutube,
  faTwitter,
  faInstagram,
)

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.mount('#app')
