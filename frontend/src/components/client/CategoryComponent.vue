<template>
    <div class="category" @click="handleClick">
        <div class="category-image-style">
            <img :src="image" alt="Category Image" />
             <span class="category-image-name">{{ name }}</span>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'CategoryComponent',
        props:{
            category:{
                type: Object,
                required: true,
            },
            name:{
                type: String,
                required: true,
            },
            image:{
                type: String,
                required: true,
            },
        },
        methods:{
            handleClick() {
            this.$emit('category-clicked', this.category)
            },
        }
    }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
.category{
    width: 482px;
    height: 329px;
    transition: transform 0.3s ease;
}
.category:hover{
    transform: scale(1.05);
}
.category-image-style{
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content:center;
    background-color: #000000;
    position: relative;
}
.category-image-style img{
    width: 100%;
    height: 100%;
    object-fit: cover;

    position: relative;
}
.category-image-name{
    font-family: 'Nunito';
    font-size: 36px;
    font-weight: 900;
    color: white;
    position: absolute;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
    bottom: 70px;
}
</style>