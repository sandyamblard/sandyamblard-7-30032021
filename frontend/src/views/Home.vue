<template>
  <div class="home">
    <!--topbar :key='headerKey' @updateHeader='upKey'></topbar-->
    <topbar></topbar>
    <welcome></welcome> 
  </div>
</template>

<script>
// @ is an alias to /src

import header from '@/components/Header.vue'
import Welcome from '@/components/Welcome.vue'

//import {emitter} from'../main'

export default {
  name: 'Home',
  components: {
    /*HelloWorld,*/
    'topbar' : header,
    'welcome' : Welcome

  },
  data(){
    return{
      headerKey:0,
    }
  },/*
  methods:{
    upKey(){
      emitter.on('updateHeader', ()=> console.log('déclenché'))/* 
      console.log('déclenché');
      this.headerKey++;*/
 /*   }
  }*/
}
</script>
