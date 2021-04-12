<template>
    <div>
        <topbar></topbar>   
        <newmessage></newmessage>
        <div class="dashboard">
            <listusers></listusers>
            <listarticles></listarticles>
        </div>
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
    /*HelloWorld,*/
    'topbar' : header,
    'listusers' : ListUsers,
    'listarticles' : ListArticles,
    'newmessage': NewMessage
  }
}
</script>

<style lang="scss" >

.dashboard{
    display: flex;
   
}

.dash--item{
    border-radius: 15px;
    background-color: white;
    margin: 1rem;
}
</style>
