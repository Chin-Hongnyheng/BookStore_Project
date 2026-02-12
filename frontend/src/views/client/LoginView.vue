<template>
  <!-- Shape Overlay (covers screen, animates away to reveal login) -->
  <div v-if="showOverlay" class="overlay-wrapper">
    <svg class="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <!-- Gradient 1: warm orange to soft blue -->
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ff8709" />
          <!-- orange -->
          <stop offset="100%" stop-color="#6ec1ff" />
          <!-- soft blue -->
        </linearGradient>

        <!-- Gradient 2: peach to blue gradient -->
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffd9b0" />
          <!-- peach -->
          <stop offset="100%" stop-color="#4a90e2" />
          <!-- deeper blue -->
        </linearGradient>
      </defs>

      <path class="shape-overlays__path" fill="url(#gradient2)" ref="path1"></path>
      <path class="shape-overlays__path" fill="url(#gradient1)" ref="path2"></path>
    </svg>
  </div>

  <div class="login-page" :class="{ 'fade-in': loginVisible }">
    <div class="login-container">
      <div class="left-login-container">
        <div class="inner-left-login-container">
          <img src="@/assets/logo.png" alt="RTC Logo" class="logo-img" />
          <span class="greeting-style-text">Greeting Fellow Customer!</span>
          <span class="account-style-text">Don't have an account?</span>
          <button class="register-button" @click="goToRegister">Register</button>
        </div>
      </div>
      <div class="right-login-container">
        <span class="login-style-text">Login</span>
        <div class="input-container">
          <input v-model="username" type="text" placeholder="Username" class="input-style" />
          <FontAwesomeIcon :icon="faUserIcon" class="input-icon" />
        </div>
        <div class="input-container">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="input-style"
          />
          <FontAwesomeIcon
            :icon="faLockIcon"
            class="input-icon"
            @click="showPassword = !showPassword"
          />
        </div>
        <button class="login-button" @click="login">Login</button>
      </div>

      <div v-if="modal.show" class="modal-overlay">
        <div class="modal-box">
          <button class="close-button" @click="handleClose">×</button>

          <p :class="modal.type === 'success' ? 'success-text' : 'error-text'">
            {{ modal.message }}
          </p>

          <button
            class="ok-button"
            :class="modal.type === 'success' ? 'ok-success' : 'ok-error'"
            @click="handleOk"
          >
            OK
          </button>
        </div>
      </div>

      <div v-if="modal.show" class="modal-overlay">
        <div class="modal-box">
          <button class="close-button" @click="handleClose">×</button>
          <p :class="modal.type === 'success' ? 'success-text' : 'error-text'">
            {{ modal.message }}
          </p>

          <!-- OK button -->
          <button
            class="ok-button"
            :class="modal.type === 'success' ? 'ok-success' : 'ok-error'"
            @click="handleOk"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import axios from 'axios'
import gsap from 'gsap'

const router = useRouter()
const faUserIcon = faUser
const faLockIcon = faLock

const username = ref('')
const password = ref('')
const showPassword = ref(false)

/* ─── Overlay animation state ─── */
const showOverlay = ref(true)
const loginVisible = ref(false)
const path1 = ref<SVGPathElement | null>(null)
const path2 = ref<SVGPathElement | null>(null)

const numPoints = 10
const numPaths = 2
const delayPointsMax = 0.3
const delayPerPath = 0.25

onMounted(async () => {
  await nextTick()

  const paths = [path1.value, path2.value]
  const allPoints: number[][] = []

  // Initialize points — all at 0 (overlay covers screen from top)
  for (let i = 0; i < numPaths; i++) {
    const points: number[] = []
    allPoints.push(points)
    for (let j = 0; j < numPoints; j++) {
      points.push(0)
    }
  }

  function render() {
    for (let i = 0; i < numPaths; i++) {
      const pathEl = paths[i]
      const points = allPoints[i]
      if (!pathEl) continue

      let d = `M 0 0 V ${points[0]} C`
      for (let j = 0; j < numPoints - 1; j++) {
        const p = ((j + 1) / (numPoints - 1)) * 100
        const cp = p - ((1 / (numPoints - 1)) * 100) / 2
        d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`
      }
      d += ` V 0 H 0`
      pathEl.setAttribute('d', d)
    }
  }

  // Initial render — overlay fully covers screen
  render()

  // Build GSAP timeline — animate points from 0 → 100 (reveal)
  const pointsDelay: number[] = []
  for (let i = 0; i < numPoints; i++) {
    pointsDelay[i] = Math.random() * delayPointsMax
  }

  const tl = gsap.timeline({
    delay: 0.5, // small pause before animation starts
    onUpdate: render,
    onComplete: () => {
      showOverlay.value = false
    },
    defaults: {
      ease: 'power2.inOut',
      duration: 0.9,
    },
  })

  // Animate each path's points to 100 (off-screen bottom)
  for (let i = 0; i < numPaths; i++) {
    const points = allPoints[i]
    const pathDelay = delayPerPath * (numPaths - i - 1)

    for (let j = 0; j < numPoints; j++) {
      const delay = pointsDelay[j]
      tl.to(points, { [j]: 100 }, delay + pathDelay)
    }
  }

  // Fade in login form slightly after overlay starts moving
  setTimeout(() => {
    loginVisible.value = true
  }, 400)
})

const modal = ref<{
  show: boolean
  type: 'success' | 'error'
  message: string
}>({
  show: false,
  type: 'success',
  message: '',
})

const goToRegister = () => {
  router.push('/register')
}

const login = async () => {
  sessionStorage.clear()

  if (!username.value || !password.value) {
    modal.value = {
      show: true,
      type: 'error',
      message: 'All fields are required',
    }
    return
  }

  try {
    const res = await axios.post('http://localhost:3001/auth/login', {
      username: username.value,
      password: password.value,
    })

    const { accessToken, refreshToken } = res.data

    // Store tokens
    sessionStorage.setItem('token', accessToken)
    sessionStorage.setItem('refreshToken', refreshToken)

    // Decode JWT payload
    const payload = JSON.parse(atob(accessToken.split('.')[1]))
    console.log('JWT Payload:', payload)

    // ✅ Store username
    sessionStorage.setItem('username', payload.username || username.value)
    console.log('Logged in username:', sessionStorage.getItem('username'))

    // ✅ Store user ID for result queries
    sessionStorage.setItem('userId', String(payload.sub || ''))
    console.log('Logged in user ID:', sessionStorage.getItem('userId'))

    let roles: string[] = []

    if (Array.isArray(payload.roles)) {
      roles = payload.roles.map((r: string) => r.toLowerCase())
    } else if (typeof payload.roles === 'string') {
      roles = [payload.roles.toLowerCase()]
    }

    // Store roles
    sessionStorage.setItem('roles', JSON.stringify(roles))
    console.log('Logged in user roles:', roles)

    modal.value = { show: true, type: 'success', message: 'Login successful!' }
  } catch (err: any) {
    console.error(err)
    modal.value = {
      show: true,
      type: 'error',
      message: 'Invalid username or password',
    }
  }
}

const handleOk = () => {
  if (modal.value.type === 'success') {
    const roles = JSON.parse(sessionStorage.getItem('roles') || '[]')
    const isAdmin = roles.some((r: string) => r.toLowerCase() === 'admin')
    const targetPath = isAdmin ? '/admin/dashboard' : '/Home'
    router.replace(targetPath).then(() => {
      window.location.reload()
    })
  } else {
    modal.value.show = false
  }
}

const handleClose = () => {
  modal.value.show = false
}
</script>

<style scoped>
/* ─── Shape Overlay ─── */
.overlay-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  background: #0e100f;
}

.shape-overlays {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

/* ─── Login fade-in ─── */
.login-page {
  opacity: 0;
  transition: opacity 0.8s ease;
}

.login-page.fade-in {
  opacity: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(159, 159, 159, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  position: relative;
  background-color: white;
  padding: 30px 20px 20px 20px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid transparent;
  background-color: transparent;
  color: #999;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  color: #ffffff;
  background-color: #3255fb;
  border: 1px solid #3255fb;
}

.error-text {
  color: #e74c3c;
  font-weight: 900;
  font-family: 'Nunito';
  margin-bottom: 20px;
  font-size: 20px;
}
.success-text {
  color: #2ecc71;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: 'Nunito';
  font-size: 20px;
}
.ok-button {
  padding: 8px 30px;
  border-radius: 8px;
  background: #3255fb;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Nunito';
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;
}

.ok-success:hover {
  background-color: #2ecc71;
  transform: scale(1.05);
}
.ok-error:hover {
  background-color: #e74c3c;
  transform: scale(1.05);
}
.input-container {
  width: 100%;
  height: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 10px 0;
}
.input-icon {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #3255fb;
  cursor: pointer;
  pointer-events: auto;
}
.input-style:focus {
  border-color: #3255fb;
  box-shadow: 0 0 0 2px rgba(94, 171, 214, 0.2);
}
.input-style {
  font-family: 'Nunito';
  font-size: 20px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  border: 2px solid #3255fb;
  width: 70%;
  height: 100%;
  outline: none;
  padding: 10px 40px 10px 20px;
  border-radius: 10px;
}
.left-login-container {
  height: 100%;
  width: 50%;
  border: 1px solid #3255fb;
  background-color: #3255fb;
  border-top-right-radius: 150px;
  border-bottom-right-radius: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner-left-login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
}
.right-login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  gap: 40px;
}
.login-style-text {
  font-family: 'Nunito';
  font-size: 40px;
  font-weight: 900;
}
.logo-img {
  width: 217px;
  height: 217px;
  transition: width 0.3s;
}
/* .login-page layout is handled by .fade-in modifier above */
.login-container {
  background-color: white;
  border: 1px solid white;
  border-radius: 20px;
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.greeting-style-text {
  font-family: 'Nunito';
  font-weight: 900;
  font-size: 40px;
  color: white;
}
.account-style-text {
  font-family: 'Nunito';
  font-weight: 400;
  font-size: 18px;
  color: white;
}
.register-button {
  font-family: 'Nunito';
  font-size: 1.2vw;
  color: white;
  font-weight: bold;
  background-color: #3255fb;
  border: 2px solid white;
  border-radius: 1vw;
  width: 50%;
  max-width: 226px;
  height: 66px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.register-button:hover {
  color: #3255fb;
  border-color: #3255fb;
  background-color: white;
}
.login-button {
  font-family: 'Nunito';
  font-size: 1.2vw;
  color: white;
  font-weight: bold;
  background-color: #3255fb;
  border: 2px solid white;
  border-radius: 10px;
  width: 82%;
  height: 10%;
  cursor: pointer;
  transition: all 0.3s ease;
}
.login-button:hover {
  color: #3255fb;
  border-color: #3255fb;
  background-color: white;
}
</style>
