<template>
    <header class="topbar">
        <img src="../../public/img/logowhite.png" alt="logo Groupomania" >
        <p>
            <span v-if='$store.firstname&&$store.isAdmin'>- Accès ADMINISTRATEUR -</span>
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
     //background-color: rgb(11, 11, 119);
     color: white;
     font-weight: bold;
     height: 50px;
     margin-top: 0;
     display: flex;
     align-items: center;
     justify-content: space-between;
     //position: fixed;
     & .fas{
         color: white;
         font-size: 35px;
         margin-left: 1rem ;
         cursor: pointer;
        
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
