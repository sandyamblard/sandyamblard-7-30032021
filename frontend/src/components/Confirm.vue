
<template>
    <div class='success'>
        <div class= 'success--message'>
            <i class="fas fa-check-circle"></i>
            <p>Effectué ! </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'success'
        
    ,
    data(){
        return{
            
        }
    }

}

</script>

<style lang="scss" scoped>
.fa-check-circle{
    font-size: 3em;
    color: green;
}

.success{
    width: 100vw;
    height: 100vh;
    background-color: rgba(190, 184, 184, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0; right: 0; left:0; bottom: 0;
}

.success--message{
    width: 65%;
    height: 60%;
    background-color: white;
    border: rgb(165, 164, 164) 1px solid;
    box-shadow: 2px 2px 8px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 12%;
    @media all and (min-width: 1024px){
        width: 50%;
        height: 30%;
    }
    & p{
        margin-bottom: 12%;
        margin-top: 2vh;
        font-weight: bold;
        font-size: 1.2em;
    }

}

</style>
