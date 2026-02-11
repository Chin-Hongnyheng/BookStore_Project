<template>
    <div class="genre-container" @click="handleClick">
        <span v-html="svgIcon" class="item-icon"></span>
        <div class="item-style">
            <span class="item-text">{{ name }}</span>
            <span class="item-mini-text">{{ count }} Items</span>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'GenreComponent',
        props:{
            genre:{
                type: Object,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            svgIcon:{
                type: String,
                required: true,
            },
            count:{
                type: Number,
                required: true,
            }
        },
        methods:{
            handleClick() {
            this.$emit('genre-clicked', this.genre)
            },
        }
    }
</script>
<style scoped>
.genre-container{
    display: flex;
    width: 246px;
    height: 76px;
    border-radius: 24px;
    padding: 14px;
    background-color: #3255FB;
    justify-content: center;
    align-items: center;
    gap:30px;

    position: relative;
    color: white;
    transition: background-color 0.3s ease, transform 0.3s ease;
}
.genre-container:hover{
    background-color: white;
    color:#3255FB;
    cursor: pointer;
    
    transform: scale(1.01);
}
.item-style{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.item-text{
    font-family: 'Nunito';
    font-size: 26px;
    font-weight: bold;
    color: currentColor;
}
.item-mini-text{
    font-family: 'Nunito';
    font-size: 16px;
    font-weight:400;
    color: currentColor;
    transition: color 0.3s ease;
}
:deep(.item-icon svg) {
    width: 40px;
    height: 40px;
    color: currentColor;
    position: absolute;

    transform: translateY(-50%);
    left: 20px;
    transition: color 0.3s ease;
}
</style>