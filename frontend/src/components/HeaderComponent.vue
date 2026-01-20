<template>
    <div class="header">
            <img :src="logo" class="logo"/>
            <NavigationComponent />
            <SearchbarComponent />
            <div class="icon-style">
                <FontAwesomeIcon :icon="farHeart" class="icon"/>
                <font-awesome-icon icon="shopping-cart" class="icon"/>
                <FontAwesomeIcon :icon="farCircleUser" class="icon"/>
            </div>
    </div>
</template>
<script>
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
                farCircleUser,
                logo,
            }
        },
    }
</script>
<style scoped>
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