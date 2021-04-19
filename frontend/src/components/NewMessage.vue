<template>
<section class='newmessage dash--item' aria-label="Ecrire un nouveau message">
    <h2 >Ecrire un message : 
        <i v-if="!writeMessage" class="fas fa-caret-down" @click='openWrite' @keyup.enter='openWrite' role='button' tabindex=0></i>
        <i v-else class="fas fa-caret-up"  @click='closeWrite' @keyup.enter='closeWrite' role='button' tabindex=0></i>
    </h2>
    <form v-if="writeMessage" class="newmessage--form appear-anim" @submit.prevent="sendMessage" >
        <div class="from-group">
            <label for="title">Titre :</label>
            <input type="text" id="title"  placeholder="*" required v-model='title' @focus='cancelError'>
        </div>
        <div class="from-group">
            <label for="content">Message :</label>
            <textarea id="content" cols="40" rows="6" placeholder="*" required v-model='content' @focus='cancelError'></textarea>
        </div>
        <div class="from-group">
            <label for="file">Photo : </label>
            <input type="file" id="file" ref='file' @change="showFile" accept="image/*" @focus='cancelError'>
        </div>
        <p class="warning" v-if="error"><i class="fas fa-exclamation-triangle"></i>{{error}}</p>
        <button class="btn" >Poster</button>
    </form>
    <success v-if="success"></success>
</section>     
</template>
<script>
import axios from 'axios';
import Confirm from '../components/Confirm.vue'
import { emitter } from '../main'

export default {
    name: 'NewMessage',
    components:{
        'success': Confirm
    },
    data(){
        return{
            writeMessage : false,
            title:'',
            content:'',
            file: '',
            url:null,
            error:'',
            success: ''
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
        showFile: function(/*event*/){
            /*const fichier = ;
            console.log('fichiers : ', fichier);*/
            //this.file =event.target.files[0];
            this.file = this.$refs.file.files[0];
            console.log('this.file :' , this.file)
            //OK le fichier est présent en premier élt de la fileList

/*Essais avec fileReader mais ne change rien...
            const fileReader = new FileReader();
            fileReader.addEventListener('load', ()=> {
                this.fichierUrl = fileReader.result
            })
            fileReader.readAsDataURL(fichier)
            this.file = fichier;
            console.log('file:', this.file)
*/
            
            
        },

        cancelError: function(){
            this.error = ''
        },

        sendMessage(){
            //Envoi si pas de fichier (sans file et envoi un objet classique)
           /* const envoi = {
                userId: this.$store.userId,
                title: this.title,
                content: this.content,
                //url: this.url, //si envoi sans file
                file: this.file //si envoi avec file (mettre une condition ensuite)
            };*/
            //ESSAI D'envoi avec fichier en utilisant FormData 
            //et changeant les headers de la requete 
            // donne erreur Multer : Unexpected Field et erreur avec middleware de verification : considère les champs title et content vide
            const envoi = new FormData();
            envoi.append('userId', this.$store.userId);
            envoi.append('title', this.title);
            envoi.append('content', this.content);
            envoi.append('file', this.file)
                console.log(envoi) 
            axios.post('http://localhost:3000/api/articles', envoi, {headers: {Authorization: 'Bearer ' + this.$store.token}/*, {Content-Type: 'multipart/form-data'}*/ })
            .then(resp=> {
                console.log(resp);
                this.success = true;
                setTimeout(()=>{this.success=false}, 1000);
                this.writeMessage =false;
                //envoi evt pour mettre à jour le composant ListArticles:
                emitter.emit('newMessageSent');console.log('evt émis')
                })
            .catch(err=>{console.log(err); this.error= err.response.data.error})
            
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
    &:focus{
    border:2px dotted rgb(11,11,119);   
    }
}

.btn{
    margin-bottom: 1.5vw;
}

label{
    font-weight: bold;
    color :rgb(11,11,119);
}
</style>