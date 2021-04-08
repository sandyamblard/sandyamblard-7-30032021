<template>
    <header class="topbar">
        <img src="../../public/img/logowhite.png" alt="logo Groupomania" >
        <p>{{ entetetitre }}<i v-if="$store.userId" class="fas fa-user-circle" title="Voir mon profil"></i></p>
    </header>
</template>



<script>


export default{
    data(){
        return {
            entetetitre: 'Réseau social d\'entreprise',
            userConnected: ''
            
        }
    }, created(){
        this.userConnected = this.$store.userId;
        
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
     & .fas{
         color: white;
         font-size: 35px;
         margin-left: 5rem ;
        
     }
 }

 .topbar img{
     height: 80%;
     width: auto;
     margin-left: 2vw;
 }

 .topbar p{
margin-right: 2vw;
display: flex;
align-items: center;
 }
</style>
