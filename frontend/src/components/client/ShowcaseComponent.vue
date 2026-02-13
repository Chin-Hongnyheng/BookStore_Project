<template>
<div class="showcase-container">
    <div class="showcase-text-container">
        <span class="showcase-title">Find Refuge in the World of Literature in our Store</span>
        <span class="showcase-text" style="width: 452px">Browse through our diverse range of meticulous curated stories and genres, designed to spark your individuality and cater to your literacy sense of style</span>
        <button class="shop-now-btn" @click="shopNow">Shop Now</button>
        <div class="description">
            <div class="description-style">
                <span class="showcase-number">200+</span>
                <span class="showcase-text">International Brands</span>
            </div>
            <div class="vertical-divider"></div>
            <div class="description-style">
                <span class="showcase-number">2,000+</span>
                <span class="showcase-text">High Quality Products</span>
            </div>
            <div class="vertical-divider"></div>
            <div class="description-style">
                <span class="showcase-number">30,000+</span>
                <span class="showcase-text">Happy Customers</span>
            </div>
        </div>
    </div>
        <img :src="girl" class="showcase-girl"/>
        <FontAwesomeIcon :icon="['fas', 'star']" class="star1-icon" />
        <FontAwesomeIcon :icon="['fas', 'star']" class="star2-icon" />
</div>
</template>
<script>
import girl from '@/assets/girl.png'
import { useRouter } from 'vue-router'
    export default{
        name: 'ShowcaseComponent',
        data(){
            return{
                girl,
            }
        },
        setup() {
        const router = useRouter()

        function shopNow() {
            router.push('/All Books/0')
        }
        return { shopNow }
  }
    }
</script>
<style scoped>
    
.vertical-divider{
    width: 2px;
    height: 70px;          /* control line height */
    background-color: #ccc;
    margin: 0 20px;        /* spacing from content */
}
.star1-icon{
    width: 70px;
    height: 70px;
    color: #3255FB;
    position:absolute;
    right: 150px;
    top: 120px;
}
.star2-icon{
    width: 70px;
    height: 70px;
    color: #3255FB;
    position:absolute;
    right: 680px;
    top: 320px;
}
.showcase-container{
    width: 100%;
    height: 656px;
    background-color: rgb(230, 229, 225);
    display: flex;
    justify-content: center;
    gap: 262px;

    position: relative;
}
.showcase-text-container{
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 28px;
}
.showcase-title{
    font-family: 'Nunito';
    color: #3255FB;
    font-size: 68px;
    font-weight: 900;
    width: 792px;
    line-height: 68px;
}
.showcase-number{
    font-family: 'Nunito';
    color: #3255FB;
    font-size: 40px;
    font-weight: bold;
}
.showcase-text{
    font-family: 'Nunito';
    color: black;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
}
.shop-now-btn {
  padding: 12px 36px;
  border-radius: 40px;
  border: none;
  background-color: #3255FB;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 210px;
  height: 52px;
  font-family: 'Nunito';
}

.shop-now-btn:hover {
  background-color: #2643d6;
  transform: scale(1.05);
}
.description{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
}
.description-style{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.showcase-girl{
    width: 421px;
    height: 655px;
    object-fit: cover;
    object-position: center;
    align-self: flex-end;
}
</style>