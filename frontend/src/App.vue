<template>
  <topbar></topbar>
  <welcome></welcome>
</template>

<script>

import header from './components/Header.vue'
import Welcome from './components/Welcome.vue'

export default {
  name: 'App',
  components: {
   'topbar' : header,
    'welcome' : Welcome
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  background-color: lightgrey;
  min-height: 100vh;
}

.group-btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
  padding: 1.5rem;
  background-color: rgb(20, 119, 119);
  border-radius: 15px;
  margin-left: 2vw;
  margin-right: 2vw;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 4vw;
}

.from-group {
    display: flex;
    align-items: center;
    } 

label {
    flex: none;
}      
input{
    flex: auto;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid rgb(21, 21, 83);
    outline: none;
    &:focus{
        border-color: rgb(52, 13, 61) ;
    }
}
button{
  border-color: transparent;
  font-family: inherit;
  font-size: inherit;
}
</style>
