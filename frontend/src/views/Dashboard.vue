<template>
    <div>
        <topbar></topbar> 
        <main class='main-dashboard'>
            <h1 class="hidden">Tableau de bord</h1>  
            <newmessage></newmessage>
            <div class="dashboard">
                <listusers></listusers>
                <listarticles></listarticles>
        </div>
        </main>
        
    </div>
</template>



<script>
// @ is an alias to /src

import header from '@/components/Header.vue'
import ListUsers from '@/components/ListUsers.vue'
import ListArticles from '@/components/ListArticles.vue'
import NewMessage from '@/components/NewMessage.vue'


export default {
  name: 'Home',
  components: {
    'topbar' : header,
    'listusers' : ListUsers,
    'listarticles' : ListArticles,
    'newmessage': NewMessage
  },
  //redirection si pas d'user connecté
  beforeCreate(){
      if(!this.$store.userId){
          this.$router.push('/')
      }
  }

}
</script>

<style lang="scss" >
.hidden{
    font-size: 0.01px;
    &::after{
        content:'';
        display: inline;
        background-color: transparent;
        margin-top: 0.4em;
    }
}


h2 {
    text-align: left;
    margin-left: 1rem;
     margin-top: 1rem;
    color: rgb(11, 11, 119);
    font-size: 1.3em;
    @media all and (min-width: 400px){
        font-size: 1.5em; 
    }
    &::after{
        content:'';
        display: block;
        height: 4px;
        width: 6rem;
        background-color: rgb(202, 61, 61);
    }
}
h3{
    color: rgb(11,11,119);

}
.dashboard{
    @media all and (min-width: 1024px){
    display: flex;
    margin-top: -2.5vw;
    }
}

.dash--item{
    border-radius: 15px;
    background-color: white;
    margin: 1rem;
    margin-bottom: 4vw;
}

main{
     @media all and (min-width: 1200px){
     width: 75%;
     margin-left: 12.5%;
   }
}
</style>
