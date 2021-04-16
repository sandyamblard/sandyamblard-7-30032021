<template>
  <div class="home">
    <topbar></topbar>
    <welcome></welcome> 
  </div>
</template>

<script>
// @ is an alias to /src

import header from '@/components/Header.vue'
import Welcome from '@/components/Welcome.vue'


export default {
  name: 'Home',
  components: {
    'topbar' : header,
    'welcome' : Welcome

  },
  data(){
    return{
      headerKey:0,
    }
  },
}
</script>
