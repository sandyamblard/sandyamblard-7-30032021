<template>
<div>
    <topbar></topbar>
    <h1>COMMENTAIRE {{id}}</h1>
    <p> pour l'article :  numéro {{article.id}} : {{article.title}}</p>
    <img :src="article.url" class="img-mini">
    <p>écrit par : <img :src="authorArticle.imageUrl" class="img-avatar">{{authorArticle.firstname}} {{authorArticle.lastname}}</p>
    <p>écrit par : <useritem v-bind:user="authorArticle"></useritem></p>

    <p>Commentaire : {{commentData.commContent}}</p>
    
    <p>Ecrit le : {{commentData.createdAt}}</p>

<p> Commentaire de : <useritem v-bind:user="authorComment"></useritem>
</p>
    <div v-if="$store.isAdmin" class='admin-area'>
        <i class="fas fa-exclamation-triangle"></i><p>ACCES ADMIN</p>
        <div @click="openModif">Modifier <i class="fas fa-user-edit" ></i></div>
        <div @click="deleteComment">Supprimer<i class="fas fa-trash-alt"></i></div>    
    </div>
    
    <div v-if="$store.userId === authorComment.id" class='author-area'>
        <div @click="openModif">Modifier <i class="fas fa-user-edit" ></i></div>
        <div @click="deleteComment">Supprimer<i class="fas fa-trash-alt"></i></div>    
    </div>
    
    <form v-if="openForm" @submit.prevent='modifyComment'>
        <label for="content">Modifier ce commentaire</label>
        <input type="text" id="content"  placeholder="*" required v-model='commContent'>
        <button class='btn'>Modifier</button>
    </form>

</div>    
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue'
import UserItem from '@/components/UserItem.vue'

export default {
    name: 'Comment',
    components:{
        'topbar': Header,
        'useritem': UserItem
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
            commContent : ''

        }
    },
    created(){
        console.log('store :' , this.$store.userId)
        axios.get(`http://localhost:3000/api/articles/comment/${this.id}`)
            .then((resp)=> {
                //console.log(resp.data);
                this.commentData = resp.data;
                this.commContent = resp.data.commContent;
                this.article = resp.data.article;
                this.authorComment = resp.data.user;
                console.log(resp.data);
                //verif si auteur du commentaire (user) est le mm que celui connecté
                console.log('auteur de article =', this.article.userId)
            //recherche des infos de l'auteur de l'article :
            axios.get(`http://localhost:3000/api/auth/users/${this.article.userId}`)
                .then((resp)=> {
                    console.log('author article',resp.data);
                    this.authorArticle = resp.data;
                })
            .catch(err => console.log(err))
            
        })
        .catch(err => console.log(err));
    },
    methods :{
        openModif : function(){
            this.openForm = true
        },

        modifyComment : function(){
            const envoi = {userId : this.$store.userId, commContent: this.commContent};
            axios.put(`http://localhost:3000/api/articles/comment/${this.id}`, envoi)
            .then (resp => {
                console.log (resp);
                this.commentData.commContent = this.commContent;
                this.openForm = false
                })
            .catch (err => console.log(err))
        },
        deleteComment : function(){
            if(confirm("Etes-vous sûr de vouloir supprimer ce commentaire ?")){
                axios.delete(`http://localhost:3000/api/articles/comment/${this.id}`)
                .then(resp => {console.log(resp);
                this.$router.push(`/article/${this.article.id}`)
                })
                .catch(err => console.log(err))  
            }

        }
    }

}
</script>

<style lang="scss" scoped>
/*.img-mini{
    width: 100px;
}*/
.admin-area{
    border: 2px red solid;
    border-radius: 10px;
    width: 15rem;
}
.author-area{
    border: 2px green solid;
    border-radius: 10px;
    width: 15rem;
}
input{
    width: 60%;
}
</style>