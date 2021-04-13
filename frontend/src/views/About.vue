<template>
  <div class="about">
  <form @submit.prevent="fauxenvoi">
            <label for="file">Photo : </label>
            <input type="file" id="file" @change="showFile">
       
    <button class="btn" >Essayer</button>
  </form></div>
</template>

<script>
// @ is an alias to /src





export default {
  name: 'About',
  data(){
    return{
      file : ''
    }
  },
  components: {
   
  
  },
     methods: {
        showFile: function(event){
            this.file = event.target.files[0];
            console.log('fichiers : ', event.target.files);
            }
     }  ,
     fauxenvoi: function(){
       console.log('submit')
       /*this.envoi = {file : this.file}
       console.log('envoi : ', this.envoi)*/
     }
}
</script>

