<template>
    <header class="topbar" :key='headerKey'>
        <router-link to='/'>
            <img src="../../public/img/logowhite.png" alt="logo Groupomania" >
        </router-link>
        
        <p v-if='!userOnline'>Réseau social d'entreprise</p>
        <p v-else>
            <span v-if='$store.firstname&&$store.isAdmin'>- <span class="desk-only" >Accès</span> ADMINISTRATEUR -</span>
            <span v-else-if='$store.firstname'>Bienvenue {{$store.firstname}} !</span>
            <i v-if="$store.userId" class="fas fa-user-circle" title="Voir mon profil" @click='goMyProfil'></i>
            <i v-if="$store.userId" class="fas fa-home" title="Revenir au mur" @click="goDashboard"></i>
            <i v-if="$store.userId" class="fas fa-power-off" title="Se déconnecter" @click="goHome"></i>
        </p>
    </header>
</template>



<script>
//import { bus } from '../main' // essai evt personnalisé pour force à updater le composant qd moidif store
//import {emitter} from'../main' //essai avec npm mitt pour créer bus event pour vue 3  mais pas ùieux (cannot read prperty  'on' of undefined ....)
import {emitter} from'../main'

export default{
    data(){
        return {
            userConnected: '',
            userOnline: false, 
            headerKey:0
        }
    }, created(){
        if(this.$store.userId){this.userOnline = true}
        this.userConnected = this.$store.userId;
        //emitter.on('deconnexion', (data) => {console.log(data); this.headerKey++})
        
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
            
             
        },
        
  
    },mounted()
    {
      emitter.on('updateHeader', ()=> {this.headerKey++; this.userOnline= false })
      emitter.on('updateHeaderFirstname', ()=> {this.headerKey++; })  
    }
}

</script>



<style lang="scss">

$color-primary : rgb(11, 11, 119);

 .topbar{
     z-index: 1000;
    width:100%;
    background-color: $color-primary;
    color: white;
    font-weight: bold;
    margin-top: 0px;
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
         height: 40px;
         width: auto;
         margin-top: 5px;
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
