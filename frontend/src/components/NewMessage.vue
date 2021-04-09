<template>
<div class='newmessage dash--item'>
    <p>Ecrire un message :</p>
    <form class="newmessage--form" @submit.prevent="sendMessage">
        <div>
            <label for="title">Titre :</label>
            <input type="text" id="title"  placeholder="*" required v-model='title'>
        </div>
        <div>
            <label for="content">Message :</label>
            <textarea id="content" cols="40" rows="6" placeholder="*" required v-model='content'></textarea>
        </div>
        <div>
            <label for="file">Photo : </label>
            <input type="file" id="file">
        </div>
        <button class="btn" >Poster</button>
    </form>
</div>     
</template>
<script>
import axios from 'axios';

export default {
    name: 'NewMessage',
    data(){
        return{
            title:'',
            content:'',
            url:''
        }
    },
    methods: {
        sendMessage(){
            //modif constantes
            const envoi = {
                userId: this.$store.userId,
                title: this.title,
                content: this.content,
                url: this.url
            };
            console.log(envoi)
            axios.post('http://localhost:3000/api/articles', envoi)
            .then
            .catch
        }
       
    }

}
</script>

<style lang="scss" scoped>
.newmessage--form div{
    display: flex;
    align-items: center;
    margin-right: 8vw;
   margin-left: 8vw;

}

</style>