<template>
    <header class="topbar">
        <img src="../../public/img/logowhite.png" alt="logo Groupomania" >
        <p>
            <span v-if='$store.firstname&&$store.isAdmin'>- <span class="desk-only" >Accès</span> ADMINISTRATEUR -</span>
            <span v-else-if='$store.firstname'>Bienvenue {{$store.firstname}} !</span>
            <span v-else>Réseau social d'entreprise</span> 
            <i v-if="$store.userId" class="fas fa-user-circle" title="Voir mon profil" @click='goMyProfil'></i>
            <i v-if="$store.userId" class="fas fa-home" title="Revenir au mur" @click="goDashboard"></i>
            <i v-if="$store.userId" class="fas fa-power-off" title="Se déconnecter" @click="goHome"></i>
        </p>
    </header>
</template>



<script>


export default{
    data(){
        return {
            
            userConnected: ''
            
        }
    }, created(){
        this.userConnected = this.$store.userId;
        
    }, methods: {
        goDashboard(){
            this.$router.push('/dashboard');
        },
        goHome(){
            this.$store.userId = "";
            this.$store.token = "";
            this.$store.firstname = "",
            this.$store.isAdmin = false;
            this.$router.push('/');

        },
        goMyProfil(){
            this.$router.push(`/user/${this.$store.userId}`);
            
             
        }
    }
}

</script>



<style lang="scss">

$color-primary : rgb(11, 11, 119);

 .topbar{
    width:100%;
    background-color: $color-primary;
    color: white;
    font-weight: bold;
    margin-top: -8px;
      & .fas{
         color: white;
         font-size: 35px;
         margin-left: 1rem ;
         cursor: pointer;
        
     }
    @media all and (min-width: 767px){
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
    }
    @media all and (min-width: 768px) and (max-width: 1023px){
        
    }
    
    
 }

 .topbar img{
     width:60% ;
     margin-top: 0.7em;
     @media all and (min-width: 767px){
         height: 80%;
         width: auto;
         margin-top: 0.1em;
        margin-left: 2vw;
     }
     
 }

 .topbar p{
margin-right: 1.5vw;
margin-left: 1.5vw;
display: flex;
align-items: center;
justify-content: space-between;

padding-bottom: 0.2em;
 }



</style>
