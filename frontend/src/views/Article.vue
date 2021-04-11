<template>
    <div>
        <topbar></topbar> 
       <h1>{{ articleData.title }}</h1>
       <section >
           <div class="article-item">
                <img :src="articleData.url" alt="" class="img-article">
                <p> {{ articleData.content }}</p>
                <p>Auteur :<img :src="imageUrl" alt="" class='img-avatar'> {{prenom}} {{nom}}</p>
                <!--p>Auteur :  {{articleData.User}}</p-->
                <!--p> Auteur : <img :src="articleData.User.imageUrl" alt="">{{articleData.User.firstname}} {{articleData.User.lastname}}</p-->
                <p>Ecrit le : {{ articleData.createdAt }}</p>
                <p>Dernière modification le : {{ articleData.updatedAt }}</p>
                <p class="showlikes" role="button" @click="showLikes" title="cliquer pour voir">
               {{ articleData.likes }} personnes aiment cet article</p>
               <!--likes  v-bind:listLikes="listLikes"></likes-->
                <div v-if="likeShowed"> 
                   <p v-for="(like, index) in listLikes" :key=index>{{like.user.firstname}} {{like.user.lastname}}</p>
                </div>
                <div v-if="userConnectedLiked" title="Cliquer pour changer d'avis" @click='voteDislike'>J'aime cet article ! <i class="fas fa-thumbs-up"></i></div>
                <div v-else title="Cliquer pour liker" @click='voteLike'>Aimer cet article<i class="far fa-thumbs-up"></i> </div>
                <!--div v-if="adminConnected"-->
                <div v-if="$store.isAdmin" class='admin-area'>
                     <i class="fas fa-exclamation-triangle"></i><p>ACCES ADMIN</p>
                        <div @click="openFormModify">Modifier <i class="fas fa-user-edit" ></i></div>
                        <div @click="deleteArticle">Supprimer<i class="fas fa-trash-alt"></i></div>    
                </div>
                <div class='author-area' v-if="idAuthor==$store.userId">
                        <div @click="openFormModify">Modifier <i class="fas fa-user-edit" ></i></div>
                        <div @click="deleteArticle">Supprimer<i class="fas fa-trash-alt"></i></div>    
                </div>
                <!--modif message form-->
                <form v-if="modifyOpen" @submit.prevent="modifyArticle">
                    <div>
                        <label for="title">Titre :</label>
                        <input type="text" id="title"  v-model="title" required >
                    </div>
                    <div>
                        <label for="content">Message :</label>
                        <textarea id="content" cols="40" rows="6" v-model="content" required ></textarea>
                    </div>
                    <div>
                        <label for="file">Photo : </label>
                        <input type="file" id="file">
                    </div>
                    <button class="btn" >Poster</button>
                </form>
           </div>
           
           <div class='commentslist'>
                <h2>Commentaires :</h2>
                <!-- Ne donne rien à l'utlisation et fait bugguer.....-->
                <!--div v-for="(comment, index) in articleData.Comments" :key=index class='comment-item'>
                   <div class="comment-item">
                        <p>{{comment.commContent}}</p>
                        <p>Par : {{comment.user.firstname}} {{comment.user.lastname}}</p>
                    </div>
                </div-->

                <div v-for="(comment, index) in allComments" :key=index class='comment-item'>
                    <!--div class="comment-item"-->
                        <p>{{comment.commContent}}</p>
                        <p>Par : {{comment.user.firstname}} {{comment.user.lastname}}</p>
                        
                        <div @click="goToComment(comment.id)" title="Détails, Modifier ou supprimer">
                            
                                <i class="fas fa-plus-circle"></i>

                        </div>
                        
                        
                    <!--/div-->
                </div>
                <form @submit.prevent="sendComment">
                    <label for="comment">Ecrire un commentaire :</label>
                    <input type="text" id="comment" required placeholder="*" v-model="commContent">
                    <button class='btn'><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
       </section>
    </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue'
//import Likes from '../components/Likes.vue'

export default {
    name: 'Article',
    components:{
        'topbar': Header
        /*'likes' : Likes*/
    },
     data() {
        return{
            id: this.$route.params.id,
            articleData: '',
            allComments:'',
            likeShowed: false,
            listLikes: [],
            listUserIdLikes: [], 
            userConnectedLiked : false,//essai pour récup les id des users qui like et voir si user connecté like l'article
            commContent:'',
            idAuthor:'',     
            modifyOpen: false,
            title: '',
            content:'',
            url: null,
            prenom:'', nom: '', imageUrl:''    //recup des infos pour mettre en value ds le formulaire
        }
    },
    created(){
        //if (this.$store.isAdmin) {this.adminConnected = true;} //on enregistre si c'est l'administrateur qui est connecté
                
        axios.get(`http://localhost:3000/api/articles/${this.id}`)
        .then((resp)=> {
            console.log(resp.data);
           this.articleData = resp.data;
           this.title= resp.data.title,
           this.content= resp.data.content,
           this.prenom= resp.data.User.firstname,
           this.nom= resp.data.User.lastname,
           this.imageUrl = resp.data.User.imageUrl,
           this.idAuthor = resp.data.User.id })
        .catch(err => console.log(err));

        axios.get(`http://localhost:3000/api/articles/${this.id}/comments`)
            .then((resp)=> {
            console.log(resp.data);
           this.allComments = resp.data})
        .catch(err => console.log(err));
        
        axios.get(`http://localhost:3000/api/articles/${this.id}/likes`)
                .then ( (resp) => {
                    console.log(resp.data);
                    this.listLikes= resp.data;
                    //console.log(this.listLikes)
                    for(let i in resp.data){                      //on enregistre les userId qui aiment l'article
                        this.listUserIdLikes.push(resp.data[i].user.id)
                    }
                    //console.log(this.listUserIdLikes)
                    if(this.listUserIdLikes.includes(this.$store.userId)){ //on compare les id présent ds le tableau à notre utilisateur connecté
                        this.userConnectedLiked = true
                    }
                    console.log(this.userConnectedLiked)
                })
                .catch(err => console.log(err));
       
        
    },
    methods: {
        showLikes: function(){
            this.likeShowed= !this.likeShowed;
        },
        sendComment: function(){
            const envoi = {
                userId: this.$store.userId,
                commContent: this.commContent
            };
            console.log(envoi);
            axios.post(`http://localhost:3000/api/articles/${this.id}/comment`, envoi)
            .then( resp => {
                console.log(resp);
                //nvlle requete pour retrouver tous les comments avec leur id
                axios.get(`http://localhost:3000/api/articles/${this.id}/comments`)
                    .then((resp)=> {
                        console.log(resp.data);
                        this.allComments = resp.data})
                        .catch(err => console.log(err));
            })
            .catch(err => console.log(err))  
        },
        goToComment : function(identif){
            this.$router.push(`/comment/${identif}`)
        }, 
        deleteArticle : function(){
            console.log("delete article")
            if(confirm('Etes-vous sûr de vouloir supprimer cet article ?')){
                axios.delete(`http://localhost:3000/api/articles/${this.id}`)
                .then( resp => {console.log(resp);
                    //// prévoir animation pop up qq secondes pour annonce article supprimé avant redirection
                    this.$router.push('/dashboard');
                })
                .catch(err => console.log(err))
            }
        }, 
        openFormModify: function(){
            this.modifyOpen= ! this.modifyOpen
        },
        modifyArticle: function(){
            const envoi= {
                title: this.title,
                content: this.content,
                url: this.url
            };
            axios.put(`http://localhost:3000/api/articles/${this.id}`, envoi)
            .then( resp => {
                console.log(resp);
                this.articleData.title = this.title;
                this.articleData.content = this.content;
                this.modifyOpen= false;

                })
            .catch(err => console.log(err))  
        },
        voteLike: function(){
            console.log("vote like");
            axios.post(`http://localhost:3000/api/articles/${this.id}/vote/like`, {userId: this.$store.userId})
            .then( resp => {
                console.log(resp);
                this.listUserIdLikes.push(this.$store.userId);
                this.userConnectedLiked = true;
                this.articleData.likes++;
            })
            .catch(err => console.log(err))
        },
        voteDislike: function(){
            console.log("vote DISlike");
            axios.post(`http://localhost:3000/api/articles/${this.id}/vote/cancellike`, {userId: this.$store.userId})
            .then( resp => {
                console.log(resp);
                this.userConnectedLiked = false;
                //ajouter trouver userId et le retirer du array
                const index = this.listUserIdLikes.indexOf(this.$store.userId);
                this.listUserIdLikes.splice(index,1)  
                //              
                this.articleData.likes-- //mise à jour du compteur de likes
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss" scoped>

.article-item, .comment-item{
     border-radius: 15px;
    background-color: white;
    margin: 2vw;
    
}
.img-article{
        max-width: 95%;
        border-radius: 10px;
        margin: 1vw;
    }
.comment-item{
    width: 80%;
    & .img-avatar{
         max-width: 50px;
    border-radius: 50%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    }
}

.showlikes:hover{
    font-weight: bold;
    cursor: pointer;
}
.commentslist{
    display: flex;
    align-items: center;
    flex-direction: column;
}
form{
    display: flex;
    width: 80%;
    align-items: center;
}
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



</style>
