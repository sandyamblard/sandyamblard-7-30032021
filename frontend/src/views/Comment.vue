<template>
<div>
    <topbar></topbar>
    <main>
        <h1>COMMENTAIRE n°{{id}}</h1>
        <h2>Pour le message :</h2>
        <section class='recap-article' aria-label='rappel du message' >
            <img v-if='article.url' :src="article.url" class="img-mini" @click='goToArticle(article.id)' @keyup.enter='goToArticle(article.id)' role='link' tabindex=0 alt='photo du message'>
            <p class='para' @click='goToArticle(article.id)' @keyup.enter='goToArticle(article.id)' role='link' tabindex=0> <span class="recap-article--title">{{article.title}}</span></p>
            <p>écrit par : <useritem v-bind:user="authorArticle"></useritem></p>
        </section>

        <h2>Commentaire :</h2>
        <section class= 'recap-comment' aria-label='détails du commentaire'>
            <p><span class="recap-article--title">{{commentData.commContent}}</span></p>
            <p class='border-top'>Ecrit le : {{dateComment(commentData.createdAt)}}</p>
            <p> Par : <useritem v-bind:user="authorComment"></useritem></p>

        </section>

        <div v-if="$store.userId === authorComment.id" class='author-area' aria-label='Modification de mon commentaire'>
            <div class='btn' role='button' tabindex=0 @click="openModif" @keyup.enter="openModif">Modifier <i class="fas fa-user-edit" ></i></div>
            <div class='btn' role='button' tabindex=0 @click="deleteComment" @keyup.enter="deleteComment">Supprimer<i class="fas fa-trash-alt"></i></div>    
        </div>

        <div v-if="$store.isAdmin" class='admin-area' aria-label='Accès administrateur sur ce commentaire'>
            <div class='btn btn-admin' role='button' tabindex=0 @click="openModif" @keyup.enter="openModif">Modifier <br> - ACCES ADMIN -<i class="fas fa-user-edit" ></i></div>
            <div class='btn btn-admin' role='button' tabindex=0 @click="deleteComment" @keyup.enter="deleteComment">Supprimer <br> - ACCES ADMIN -<i class="fas fa-trash-alt"></i></div>    
        </div>

        <form v-if="openForm" @submit.prevent='modifyComment' class='appear-anim' aria-label='Formulaire pour modifier ce commentaire'>
            <div><i @click='openModif' @keyup.enter='openModif' class="fas fa-caret-up" role='button' tabindex=0></i></div>
            <label for="content">Modifier ce commentaire</label>
            <input type="text" id="content"  placeholder="*" required v-model='commContent' @focus='cancelError'>
            <button class='btn'>Modifier</button>
        </form>
        <p class="warning" v-if="error"><i class="fas fa-exclamation-triangle"></i>{{error}}</p>
        <success v-if="success"></success>
    
    
    </main>   
</div>    

</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue'
import UserItem from '@/components/UserItem.vue'
import Confirm from '../components/Confirm.vue'

export default {
    name: 'Comment',
    components:{
        'topbar': Header,
        'useritem': UserItem,
        'success': Confirm
    }, 
    data(){
        return{
            id: this.$route.params.id,
            commentData: '',
            article:'',
            authorComment: false, //auteur du commentaire
            title: '',
            url:'', 
            authorArticle: '', //auteur de l'article
            openForm: false,
            commContent : '',
            error:'',
            success:''
        }
    },
    /// si pas d'utilisateur connecté redirection en page d'accueil
    beforeCreate(){
      if(!this.$store.userId){
          this.$router.push('/')
      }
  },
    created(){
        axios.get(`http://localhost:3000/api/articles/comment/${this.id}`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then((resp)=> {
                this.commentData = resp.data;
                this.commContent = resp.data.commContent;
                this.article = resp.data.article;
                this.authorComment = resp.data.user;
                //verif si auteur du commentaire (user) est le mm que celui connecté
            //recherche des infos de l'auteur de l'article :
            axios.get(`http://localhost:3000/api/auth/users/${this.article.userId}`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
                .then((resp)=> {
                    this.authorArticle = resp.data;
                })
            .catch(err => console.log(err))
            
        })
        .catch(err => console.log(err));
    },
    methods :{
        dateComment : function(string){
            const date = new Date(string);
            return date.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day:'numeric', hour:'numeric', minute: 'numeric'} )
             
        },
        openModif : function(){
            this.openForm = !this.openForm
        },

        
        cancelError: function(){
            this.error = ''
        },

        modifyComment : function(){
            const envoi = {userId : this.$store.userId, commContent: this.commContent};
            axios.put(`http://localhost:3000/api/articles/comment/${this.id}`, envoi, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then (() => {
                this.commentData.commContent = this.commContent;
                this.openForm = false;
                this.success = true;
                setTimeout(()=>{this.success=false}, 1000);
                })
            .catch (err => {console.log(err); this.error= err.response.data.error})
        },
        deleteComment : function(){
            if(confirm("Etes-vous sûr de vouloir supprimer ce commentaire ?")){
                axios.delete(`http://localhost:3000/api/articles/comment/${this.id}`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
                .then(() => {
                this.success = true;
                setTimeout(()=>{this.success=false}, 1000);
                setTimeout(()=>this.$router.push(`/article/${this.article.id}`), 1000);
                })
                .catch(err => {console.log(err); this.error= err.response.data.error})  
            }

        },
        goToArticle: function(identif){
            this.$router.push(`/article/${identif}`);
        }
    }

}
</script>

<style lang="scss" scoped>
h2{
    font-size: 1.1em;
    margin-bottom: 0.2em;
    margin-top: 2em;
    &::after{
        background-color: transparent;
        
    }
}
main{
    @media all and (min-width: 767px){
    padding-top: 50px;
    }
}
.img-mini{
    border-radius: 10px;
    margin-left: 0.8em;
    border: ridge grey 3px;
    &:focus{
        box-shadow: 0 0 15px rgb(11,119,119 );
    }
}
main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.recap-article{
    border-radius: 10px;
    background-color:rgba(255,255,255, 0.7);
    padding: 0.5em;
    width: 80%;
    @media all and (min-width: 1024px){
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    &--title{
        font-weight: bold;
        line-height: 3em;
    }
    &:hover{
        box-shadow: 1px 1px 10px grey;
    }
    & img, 
    & .para{
        cursor: pointer;
    }
    & p:focus{ 
        border: dotted 2px grey;
    }
}
.recap-comment{
    border: ridge rgb(230, 227, 227) 3px;
    padding: 1em;
    margin-top: 2vw;
    border-radius: 10px;
    background-color: white;
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media all and (min-width: 767px){
        width: 85%;
    }
}/*
.admin-area{
    border: 2px red solid;
    border-radius: 10px;
    width: 15rem;
}
.author-area{
    border: 2px green solid;
    border-radius: 10px;
    width: 15rem;
}*/
input{
    width: 95%;
    @media all and (min-width: 767px){
    width: 60%;
    }
}

.border-top{
    border-top: 1px dotted grey;
    padding-top: 2em;
}

.fa-caret-up{
    font-size: 2.5em;
    padding: 0.1em;
    padding-left: 0.8em;
    padding-right: 0.8em;
    cursor: pointer;
    color: rgb(11,11,119);
}
</style>