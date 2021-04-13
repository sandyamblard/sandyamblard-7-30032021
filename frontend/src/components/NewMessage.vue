<template>
<div class='newmessage dash--item'>
    <h2 >Ecrire un message : 
        <i v-if="!writeMessage" class="fas fa-caret-down" @click='openWrite'></i>
        <i v-else class="fas fa-caret-up"  @click='closeWrite'></i>
    </h2>
    <form v-if="writeMessage" class="newmessage--form" @submit.prevent="sendMessage">
        <div class="from-group">
            <label for="title">Titre :</label>
            <input type="text" id="title"  placeholder="*" required v-model='title'>
        </div>
        <div class="from-group">
            <label for="content">Message :</label>
            <textarea id="content" cols="40" rows="6" placeholder="*" required v-model='content'></textarea>
        </div>
        <div class="from-group">
            <label for="file">Photo : </label>
            <input type="file" id="file" @change="showFile" accept="image/*">
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
            file: '',
            url:null,
            fichierUrl:'',
            writeMessage : false,
        }
    },
    methods: {
        closeWrite: function(){
            this.writeMessage =false;
        }
        ,
        openWrite: function(){
            this.writeMessage =true;
        }
        ,
        showFile: function(event){
            const fichier = event.target.files[0];
            console.log('fichiers : ', fichier);

            const fileReader = new FileReader();
            fileReader.addEventListener('load', ()=> {
                this.fichierUrl = fileReader.result
            })
            fileReader.readAsDataURL(fichier)
            this.file = fichier;
            console.log('file:', this.file)

            
            
        },
        sendMessage(){
            //modif constantes
            const envoi = {
                userId: this.$store.userId,
                title: this.title,
                content: this.content,
                url: this.url,
                //file: this.file
            };
            /*const envoi = new FormData();
            envoi.append('userId', this.$store.userId);
            envoi.append('title', this.title);
            envoi.append('content', this.content);
            envoi.append('file', this.file)*/
            console.log(envoi)
            axios.post('http://localhost:3000/api/articles', envoi/*, {headers: {'Content-Type': 'multipart/form-data'}}*/)
            .then(resp=> {
                console.log(resp);
                    //rajouter nvelle requête get pour récup tous les articles et mettre a jour la page
                })
            .catch(err => console.log(err))
            
        }
       
    }

}
</script>

<style lang="scss" scoped>
.newmessage{
     @media all and (min-width: 767px){
    margin-top: 55px;
    }
}

h2{
    padding-bottom: 1em;
}
.newmessage--form div{
margin-left: 1vw;
    @media all and (min-width: 767px){
        display: flex;
        align-items: center;
        margin-right: 8vw;
        margin-left: 8vw;
    }
}

.fa-caret-down,
.fa-caret-up{
    font-size: 3rem;
    color : rgb(11,11,119);
    padding: 0.2em 0.3em 0em 0.5em;
    cursor: pointer;
    //vertical-align : middle;
}

.btn{
    margin-bottom: 1.5vw;
}

label{
    font-weight: bold;
    color :rgb(11,11,119);
}
</style>