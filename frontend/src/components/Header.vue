<template>
    <header class="topbar">
        <img src="../../public/img/logowhite.png" alt="logo Groupomania" >
        <p>{{ entetetitre }}</p>
    </header>
</template>



<script>

export default{
    data(){
        return {
            entetetitre: 'Réseau social d\'entreprise'
        }
    }
}

</script>



<style lang="scss">
 .topbar{
     width:100%;
     background-color: rgb(11, 11, 119);
     color: white;
     font-weight: bold;
     height: 50px;
     margin-top: 0;
     display: flex;
     align-items: center;
     justify-content: space-between;
 }

 .topbar img{
     height: 80%;
     width: auto;
     margin-left: 2vw;
 }

 .topbar p{
margin-right: 2vw;

 }
</style>
