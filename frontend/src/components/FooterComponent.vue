<template>
    <div class="container">
        <div class="text-style">
            <span>STAY UP TO DATE ABOUT OUR LATEST OFFERS</span>
        </div>
        <div class="button-fill">
            <div class="icon-input-wrapper">
                <FontAwesomeIcon :icon="farEnvelope" class="envelope-icon"/>
                <input type="text" placeholder="Enter your email address" class="input-footer-style"/>
            </div>
            <button class="button-footer-style">Subscribe to NewsLetter</button>
        </div>
    </div>

    <div class="footer-container">
        <!-- Boundora -->
        <div class="Boundora-style">
            <div class="Boundora-logo">
                <span class="Boundora">BOUNDORA</span>
                <img :src="logo" style="width: 80px; height: 80x;"/>
            </div>
            <div class="contact-style">
                <span class="header-label-router">Contact Info</span>
                <!-- Address -->
                <p class="footer-address">
                    <span class="label-router">Address: </span>
                    <span class="filling">Institute of Technology of Cambodia</span>
                </p>
                <!-- Phone Number -->
                <p class="footer-phone">
                    <span class="label-router">Call us: </span>
                    <span class="filling">+855 12345678</span>
                </p>
                <!-- Email -->
                <p class="footer-email">
                    <span class="label-router">Email us: </span>
                    <span class="filling">Boundora@gmail.com</span>
                </p>
            </div>
            <div class="follow-us">
                <span class="header-label-router">Follow Us</span>
                <div class="app-icon-style">
                    <FontAwesomeIcon icon="fa-brands fa-facebook" class="app-icon" />
                    <FontAwesomeIcon icon="fa-brands fa-youtube" class="app-icon"/>
                    <FontAwesomeIcon icon="fa-brands fa-twitter" class="app-icon"/>
                    <FontAwesomeIcon icon="fa-brands fa-instagram" class="app-icon"/>
                </div>
            </div>
        </div>
        <!-- Company -->
        <div class="header-label">
            <span class="header-label-router">Company</span>
            <div class="label">
                <router-link class="label-router">About Us</router-link>
                <router-link class="label-router">Publisher PartnerShip</router-link>
                <router-link class="label-router">Contact Us</router-link>
                <router-link class="label-router">Privacy Policy</router-link>
                <router-link class="label-router">Disclaimer</router-link>
            </div>
        </div>
        <!-- My Account -->
        <div class="header-label">
            <span class="header-label-router">My Account</span>
            <div class="label">
                <router-link class="label-router">My Orders</router-link>
                <router-link class="label-router">My Addresses</router-link>
                <router-link class="label-router">My Personal Info</router-link>
            </div>
        </div>
        <!-- Support -->
        <div class="header-label">
            <span class="header-label-router">Support</span>
            <div class="label">
                <router-link class="label-router">Term of Use</router-link>
                <router-link class="label-router">How to Order</router-link>
                <router-link class="label-router">Shipping Policy</router-link>
                <router-link class="label-router">Privacy Policy</router-link>
                <router-link class="label-router">Return Policy</router-link>
            </div>
        </div>
         <!-- More Books -->
        <div class="header-label">
            <span class="header-label-router">More Books</span>
            <div class="label">
                <router-link class="label-router">Khmer Languages</router-link>
                <router-link class="label-router">International Languages</router-link>
                <router-link class="label-router">Award Winning Books</router-link>
                <router-link class="label-router">Frontlist Picks Books</router-link>
                <router-link class="label-router">Used Books</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import logo from '@/assets/logo.png'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons'
export default{
    name:'FooterComponent',
    components:{
            FontAwesomeIcon
        },
    data(){
        return{
            farEnvelope,
            logo,
        }
    }
}
</script>
<style scoped>
.follow-us{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.app-icon {
    width: 30px;
    height: 30px;
    border: 1px solid white;
    padding: 15px;
    border-radius: 12px;
    box-sizing: content-box;
    transition: 
        transform 0.3s ease,
        background-color 0.3s ease,
        color 0.3s ease;
}

.app-icon:hover {
    transform: scale(1.2);
    background-color: #ffffff;
    color: #2563eb;
}

.app-icon-style{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
}
.Boundora-style{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 33px;
    margin-top: 50px;
}
.Boundora-logo{
    display:flex;
    justify-content: flex-start;
    gap: 20px;
    align-items: center;
}
.contact-style{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
}
.contact-style p{
    margin: 0;
}
.Boundora{
    font-family: 'Nunito';
    font-size: 30px;
    font-weight: 900;
    color: rgb(255, 255, 255);
}
.filling{
    font-family: 'Nunito';
    font-size: 22px;
    text-decoration: none;
    cursor: pointer;
    color: rgb(255, 255, 255);
}
.footer-container{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 134px;
    width: 100%;
    height: 524px;
    background-color: #3255FB;
    margin-top: 50px;
}
.label{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: flex-start;
    gap: 14px;
}
.header-label-router{
    font-family: 'Nunito';
    font-size: 26px;
    font-weight: 800;
    color:rgb(255, 255, 255);
}
.label-router{
    font-family: 'Nunito';
    font-size: 22px;
    text-decoration: none;
    cursor: pointer;
    font-weight: 500;
    color: rgb(255, 255, 255);
}
.header-label{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    margin-top: 125px;
}
.container{
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    background-color: #3255FB;
    width:60%;
    height:316px;
    margin: 0 auto;
    margin-top:36px;
    border-radius: 20px;
}
.text-style{
    display: flex;
    align-items:center;
    justify-content: center;
    font-family: 'Nunito';
    font-size: 42px;
    font-weight: 800;
    color: white;
    width: 610px;
}
.button-fill{
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:14px;
}
.input-footer-style{
    width:328px;
    height:48px;
    font-family: 'Nunito';
    font-size: 16px;
    font-weight: 600;
    border-radius: 62px;
    text-align: center;
    outline:none;
}
.button-footer-style{
    width: 328px;
    height: 48px;
    font-family: 'Nunito';
    background-color: white;
    font-size: 16px;
    font-weight: 800;
    border-radius: 62px;
    outline: none;
    border: none;
    transition: transform 0.3s ease,background-color 0.3s, color 0.1s;
}
.button-footer-style:hover{
    background-color: #ffa600;
    transform: scale(1.1);
    color: white;
}
.icon-input-wrapper{
    position: relative;
}
.envelope-icon{
    position: absolute;
    left: 20px;
    top:50%;
    transform: translateY(-50%);
    font-size:25px;
    padding: 10px;
}
</style>