<template>
    <div class="header">
        <img :src="logo" class="logo"/>
        <NavigationComponent />
        <SearchbarComponent />
        
        <div class="icon-style">
            <FontAwesomeIcon :icon="farHeart" class="icon" @click="goToWishlist"/>
            <font-awesome-icon icon="shopping-cart" class="icon"/>
            
            <div class="user-menu-wrapper">
                <FontAwesomeIcon 
                    :icon="farCircleUser" 
                    class="icon" 
                    :class="{ 'active-icon': showUserBox }"
                    @click="toggleUserBox"
                />

                <transition name="fade-slide">
                    <div v-if="showUserBox" class="user-box">
                        <div class="user-box-header">
                            <div class="avatar-container">
                                <label for="profile-upload" class="avatar-label">
                                    <img v-if="user.profilePic" :src="user.profilePic" class="avatar-img" />
                                    <div v-else class="avatar-circle">
                                        {{ user.username.charAt(0).toUpperCase() }}
                                    </div>
                                    
                                    <div class="edit-badge">
                                        <font-awesome-icon :icon="faPencil" class="pencil-icon" />
                                    </div>
                                </label>
                                <input 
                                    type="file" 
                                    id="profile-upload" 
                                    @change="handlePictureUpload" 
                                    accept="image/*" 
                                    hidden 
                                />
                            </div>
                            <div class="header-info">
                                <span class="username">{{ user.username }}</span>
                                <span class="user-email">{{ user.email }}</span>
                            </div>
                        </div>

                        <div class="user-box-body">
                            <div class="info-row">
                                <span class="label">User ID</span>
                                <span class="value">#{{ user.id }}</span>
                            </div>
                        </div>

                        <div class="user-box-footer">
                            <button class="logout-btn" @click="logout">
                                <span>Logout</span>
                                <font-awesome-icon icon="sign-out-alt" />
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import { faPencilAlt as faPencil } from '@fortawesome/free-solid-svg-icons'
    import NavigationComponent from './NavigationComponent.vue'
    import SearchbarComponent from './SearchbarComponent.vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
    import { faCircleUser as farCircleUser} from '@fortawesome/free-regular-svg-icons'
    import logo from '@/assets/logo.png'

    export default{
        name: 'HeaderComponent',
        components:{
            NavigationComponent,
            SearchbarComponent,
            FontAwesomeIcon
        },
        data() {
            return{
                farHeart,
                faPencil,
                farCircleUser,
                logo,
                showUserBox: false,
                user: {
                    username: '',
                    id: '',
                    email: '' ,
                    profilePic: null  
                }
            }
        },
        mounted() {
            this.getUserInfo();
            const savedPic = localStorage.getItem(`pfp_${this.user.id}`);
            if (savedPic) {
                this.user.profilePic = savedPic;
            }
        },
        methods:  {
            handlePictureUpload(event) {
                const file = event.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64Image = e.target.result;
                    this.user.profilePic = base64Image;
                    
                    // Save it locally for now
                    localStorage.setItem(`pfp_${this.user.id}`, base64Image);
                };
                reader.readAsDataURL(file);
            },
            goToWishlist() {
                this.$router.push('/wishlist')
            },
            toggleUserBox() {
                this.showUserBox = !this.showUserBox
            },
            logout() {
                sessionStorage.removeItem('token')
                this.$router.push('/login')
            },
            getUserInfo() {
                const token = sessionStorage.getItem('token')
                    if (!token) return
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]))
                    this.user.username = payload.username || 'Unknown'
                    this.user.id = payload.sub || 'N/A'
                    this.user.email = payload.email || 'N/A'
                } catch (err) {
                    console.error('Error parsing token:', err)
                }
            }
        },
    }
</script>
<style scoped>
.user-menu-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.active-icon {
    color: #3255FB;
}

/* The Modal/Box */
.user-box {
    position: absolute;
    top: 60px; /* Adjust based on your header height */
    right: 0;
    width: 280px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border: 1px solid #eee;
    z-index: 1000;
    overflow: hidden;
    font-family: 'Nunito', sans-serif;
}

/* The Little Arrow/Beak */
.user-box::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 15px;
    width: 16px;
    height: 16px;
    background: white;
    transform: rotate(45deg);
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
}

/* Header Section */
.user-box-header {
    padding: 20px;
    background: #f8faff;
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.avatar-container {
    position: relative;
    display: inline-block;
}

.avatar-label {
    position: relative;
    cursor: pointer;
    display: block;
}

.avatar-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #3255FB;
}

.avatar-circle {
    width: 60px;
    height: 60px;
    background: #3255FB;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    font-size: 24px;
}

.edit-badge {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 22px;
    height: 22px;
    background: white;
    border: 2px solid #3255FB;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: transform 0.2s ease;
}

.pencil-icon {
    font-size: 10px;
    color: #3255FB;
}

.avatar-label:hover .edit-badge {
    transform: scale(1.1);
    background: #f0f2ff;
}

.header-info {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.username {
    font-weight: 800;
    font-size: 16px;
    color: #333;
}

.user-email {
    font-size: 12px;
    color: #777;
}

.user-box-body {
    padding: 15px 20px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}

.label {
    color: #999;
    font-weight: 600;
}

.value {
    color: #333;
    font-weight: 700;
}


.user-box-footer {
    padding: 15px 20px;
    background: #fff;
}

.logout-btn {
    width: 100%;
    padding: 10px;
    border: 2px solid #ff4d4d;
    background: transparent;
    color: #ff4d4d;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.logout-btn:hover {
    background: #ff4d4d;
    color: white;
}

.fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.3s ease;
}
.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
.icon-style{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
}
.icon {
  font-size: 35px;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}
.icon:hover {
  color: #3255FB;
  transform: scale(1.2);
}
.header{
    width: 100%;
    display:flex;
    flex-direction: row;
    gap:20px;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
}
.logo{
    width:150px;
    height:150px;
}
</style>