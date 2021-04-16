<template>
    <div>
        <topbar></topbar> 
        <main>
       <h1>{{ articleData.title }}</h1>
       <section >
           <article class="article-item">
                <span v-if='articleData.url'> <img :src="articleData.url" alt="" class="img-article" ></span>
                <p class='article-item--para'> {{ articleData.content }}</p>
                <!--p>Auteur :<img :src="imageUrl" alt="" class='img-avatar'> {{prenom}} {{nom}}</p-->
                <div class='article-infos'>
                    <p>Ecrit le : {{ dateArticle(articleData.createdAt) }}</p>
                    <p>Auteur : <useritem v-bind:user="{id: idAuthor,firstname: prenom, lastname: nom, imageUrl: imageUrl}"> </useritem></p>
                    <!--p>Dernière modification le : {{ articleData.updatedAt }}</p-->
                </div>

                <div class='article-likes '>
                    <div class="showlikes" role="button" @click="showLikes" title="cliquer pour voir"><span>{{ articleData.likes }} personnes aiment cet article</span>
                        <div v-if="likeShowed" class="like-show appear-anim"> 
                        <i  class="fas fa-caret-up"  @click.stop="showLikes"></i>
                        <p v-for="(like, index) in listLikes" :key=index>    
                            <useritem v-bind:user="like.user"></useritem>
                            <!--img :src="like.user.imageUrl" class="img-avatar">
                            {{like.user.firstname}} {{like.user.lastname}}-->
                        </p>
                    </div>
                    </div>
                    
                    
                    <div v-if="userConnectedLiked" title="Cliquer pour changer d'avis" @click='voteDislike' class='liked' >J'aime cet article ! <i class="fas fa-thumbs-up"></i></div>
                    <div v-else title="Cliquer pour liker" @click='voteLike' class='votelike'>Aimer cet article<i class="far fa-thumbs-up"></i> </div>
                    
                    
                </div>
                
                <!--div v-if="adminConnected"-->
                <div v-if="$store.isAdmin" class='admin-area'>
                        <div class='btn btn-admin' @click="openFormModify">Modifier <i class="fas fa-user-edit" ></i><br>- ACCES ADMIN -</div>
                        <div class='btn btn-admin' @click="deleteArticle">Supprimer<i class="fas fa-trash-alt"></i><br>- ACCES ADMIN -</div>    
                </div>
                <div class='author-area' v-if="idAuthor==$store.userId">
                        <div class='btn' @click="openFormModify">Modifier <i class="fas fa-user-edit" ></i></div>
                        <div class='btn' @click="deleteArticle">Supprimer<i class="fas fa-trash-alt"></i></div>    
                </div>
                <!--modif message form-->
                <form v-if="modifyOpen" @submit.prevent="modifyArticle" class='modif-article appear-anim'>
                    <i  class="fas fa-caret-up"  @click.stop="openFormModify"></i>
                    <div class="from-group">
                        <label for="title">Titre :</label>
                        <input type="text" id="title"  v-model="title" required  @focus='cancelError'>
                    </div>
                    <div class="from-group">
                        <label for="content">Message :</label>
                        <textarea id="content" cols="40" rows="9" v-model="content" required  @focus='cancelError'></textarea>
                    </div>
                    <div class="from-group">
                        <label for="file">Photo : </label>
                        <input type="file" id="file" ref='file' @change='showFileSelected' accept='image/*' @focus='cancelError'>
                    </div>
                    <p class="warning" v-if="error"><i class="fas fa-exclamation-triangle"></i>{{error}}</p>
                    <button class="btn" >Modifier l'article</button>
                </form>
           </article>
           
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
                        <div class='comment-item--content'>
                            <p class="comment-item--para">{{comment.commContent}}</p>
                            <p class="comment-item--author">Par : <useritem v-bind:user="comment.user"></useritem></p>
                        </div>
                        <i class="fas fa-plus-circle" @click="goToComment(comment.id)" title="Détails, Modifier ou supprimer"></i>
                </div>

                <form @submit.prevent="sendComment" class="sendcomment from-group">
                    <label for="comment">Ecrire un commentaire :</label>
                    <input type="text" id="comment" required placeholder="*" v-model="commContent" @focus='cancelError'>
                    
                    <button class='btn btn-small'><i class="fas fa-paper-plane"></i></button>
                </form>
                <p class="warning" v-if="error"><i class="fas fa-exclamation-triangle"></i>{{error}}</p>
            </div>
       </section>
       <success v-if="success"></success>
    </main></div>
    
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue'
import UserItem from '@/components/UserItem.vue'
import Confirm from '../components/Confirm.vue'


export default {
    name: 'Article',
    components:{
        'topbar': Header,
        'useritem' : UserItem,
        'success': Confirm
        
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
            file:'',
            prenom:'', nom: '', imageUrl:'' ,   //recup des infos du User
            error: '',
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
           //recup des articles     
        axios.get(`http://localhost:3000/api/articles/${this.id}`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
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

        // recup des commentaires de l'articles
        axios.get(`http://localhost:3000/api/articles/${this.id}/comments`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then((resp)=> {
            console.log(resp.data);
           this.allComments = resp.data})
        .catch(err => console.log(err));
        
        //recup des likes de l'articles
        axios.get(`http://localhost:3000/api/articles/${this.id}/likes`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
                .then ( (resp) => {
                    //console.log(resp.data);
                    this.listLikes= resp.data;
                    //console.log(this.listLikes)
                    for(let i in resp.data){  //on enregistre les userId qui aiment l'article
                        this.listUserIdLikes.push(resp.data[i].user.id)
                    }
                    //console.log(this.listUserIdLikes)
                    if(this.listUserIdLikes.includes(this.$store.userId)){ 
                        //on compare les id présent ds le tableau à notre utilisateur connecté
                        this.userConnectedLiked = true
                    }
                })
                .catch(err => console.log(err));
       
        
    },
    methods: {
        dateArticle : function(string){
            const date = new Date(string);
            return date.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day:'numeric', hour:'numeric', minute: 'numeric'} )
             
        },
        showLikes: function(){
            this.likeShowed= !this.likeShowed;
        },
        showFileSelected: function(){
            this.file = this.$refs.file.files[0];
            console.log('fileSelectd : ' , this.file)
        }
        ,

        goToComment : function(identif){
            this.$router.push(`/comment/${identif}`)
        }, 

         openFormModify: function(){
            this.modifyOpen= ! this.modifyOpen
        },

        
        cancelError: function(){
            this.error = ''
        },


        ///////////ENVOYER UN COMMENTAIRE ////////////////
        sendComment: function(){
            const envoi = {
                userId: this.$store.userId,
                commContent: this.commContent
            };
            //console.log(envoi);
            axios.post(`http://localhost:3000/api/articles/${this.id}/comment`, envoi, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then( () => {
                this.commContent = '';
                //console.log(resp);
                //nvlle requete pour retrouver tous les comments avec leur id et update la page
                axios.get(`http://localhost:3000/api/articles/${this.id}/comments`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
                    .then((resp)=> {
                        //console.log(resp.data);
                        this.allComments = resp.data;
                        this.success = true;
                        setTimeout(()=>{this.success=false}, 1000);
                        })
                        .catch(err => {console.log(err); this.error= err.response.data.error});
            })
            .catch(err => {console.log(err); this.error= err.response.data.error})  
        },


        ///////////SUPPRIMER UN ARTICLE ////////////////
        deleteArticle : function(){
            if(confirm('Etes-vous sûr de vouloir supprimer cet article ?')){
                axios.delete(`http://localhost:3000/api/articles/${this.id}`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
                .then( resp => {console.log(resp);
                    this.success = true;
                    setTimeout(()=>{this.success=false}, 1000);
                    setTimeout(()=>this.$router.push(`/dashboard`), 1000);
                })
                .catch(err => console.log(err))
            }
        }, 
    

        ///////////MODIFIER UN ARTICLE ////////////////
        modifyArticle: function(){
            const envoi = new FormData();
            envoi.append('userId', this.$store.userId);
            envoi.append('title', this.title);
            envoi.append('content', this.content);
            envoi.append('file', this.file);
            //console.log(envoi);
            axios.put(`http://localhost:3000/api/articles/${this.id}`, envoi, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then( () => {
                //console.log(resp.data);
                this.articleData.title = this.title;
                this.articleData.content = this.content;
                this.modifyOpen= false;
                //pr récup nvlle url: nvlle requete get
                    axios.get(`http://localhost:3000/api/articles/${this.id}`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
                    .then(resp =>{
                        //console.log(resp);
                        this.articleData.url =resp.data.url;
                        this.success = true;
                        setTimeout(()=>{this.success=false}, 1000);
                    }).catch(err => {console.log(err); this.error= err.response.data.error})              
                })
            .catch(err => {console.log(err); this.error= err.response.data.error})  
        },

        ///////////GESTION DU LIKE ////////////////
        voteLike: function(){
            axios.post(`http://localhost:3000/api/articles/${this.id}/vote/like`, {userId: this.$store.userId}, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then( () => {
                //console.log(resp);
                this.listUserIdLikes.push(this.$store.userId);
                this.userConnectedLiked = true;
                this.articleData.likes++;
                axios.get(`http://localhost:3000/api/articles/${this.id}/likes`, {headers: {Authorization: 'Bearer ' + this.$store.token,}}) //recup de la liste des likes mise à jour (pour affichage des noms des users)
                .then ( (resp) => {this.listLikes= resp.data;})
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
        },

        ///////////GESTION DU CANCEL LIKE ////////////////
        voteDislike: function(){
            axios.post(`http://localhost:3000/api/articles/${this.id}/vote/cancellike`, {userId: this.$store.userId}, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then( resp => {
                console.log(resp);
                this.userConnectedLiked = false;
                //trouver userId et le retirer du array
                const index = this.listUserIdLikes.indexOf(this.$store.userId);
                this.listUserIdLikes.splice(index,1)  
                //              
                this.articleData.likes-- //mise à jour du compteur de likes
                //recup de la liste des likes mise à jour (pour affichage des noms des users)
                axios.get(`http://localhost:3000/api/articles/${this.id}/likes`, {headers: {Authorization: 'Bearer ' + this.$store.token,}}) 
                .then ( (resp) => {this.listLikes= resp.data;})
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss" scoped>

main{
        @media all and (min-width: 767px){
    padding-top: 50px;
    }
}

.article-item{
    padding: 1em;
    
}
.article-item, .comment-item{
     border-radius: 15px;
    background-color: white;
    margin: 2vw;
    &--para{
        font-weight: bold;
    }
}

.comment-item--para{
    margin-left: 1em;
}


.img-article{
    max-width: 98%;
    border-radius: 10px;
    margin: 1vw;
    border: 5px ridge grey;
    @media all and (min-width: 767px){
        max-width: 80%;
    }
        

    }
.comment-item{ 
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media all and (min-width: 767px){
        width: 80%;
    }    
   /* & .img-avatar{
         max-width: 50px;
    border-radius: 50%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    }*/
    &--author{
        text-align: left;
        margin-left: 1em;
        padding-top: 0.8em;
        border-top: dotted 1px grey ;
    }
}


.fa-plus-circle{
    font-size: 2em;
    margin-right:0.2em;
    color: rgb(139, 137, 137);
    cursor: pointer;
    @media all and (min-width: 767px){
         margin-right:1em;
    }
   
}

.showlikes span:hover{
    font-weight: bold;
    cursor: pointer;
   
}
.commentslist{
    display: flex;
    align-items: center;
    flex-direction: column;
}

.modif-article{
    flex-direction: column;
    @media all and (min-width: 767px){
    padding: 2em;
    }
}

    

/////////////////////


h2::after{
    background-color: transparent;
}

.article-infos{
    border-top: dashed 1px grey ;
    @media all and (min-width: 767px){
    display: flex;
    justify-content: space-around;
    align-items: center;
    }
    //border-bottom: dashed 1px grey ;
}
.article-likes{
    @media all and (min-width: 767px){
    display: flex;
    justify-content: center;
    align-items: center;
    }
}

.showlikes{
     margin: 1em;
}

.like-show{
    padding: 0.5em;
    border-radius: 10px ;
    border: grey 1px solid;
    box-shadow: 1px 1px 10px grey;
    
}

.fa-caret-up{
    font-size: 2.5em;
    padding: 0.1em;
    padding-left: 0.8em;
    padding-right: 0.8em;
    cursor: pointer;
    color: rgb(11,11,119);
}

.votelike{
    margin-left: 2em;
    cursor: pointer;
    color: rgb(11,11,119);
    &:hover{
        text-decoration: underline;
    }
    & .far{
        font-size: 1.7em;
        margin-left: 0.5em;
        &:hover{
            transform: scale(1.2);
        }
    }
}

.liked{
    margin-left: 2em;
    cursor: pointer;
    color: green;
    &:hover{
        text-decoration: underline;
    }
    & .fas{
        font-size: 1.7em;
        margin-left: 0.5em;
        
        &:hover{
            transform: scale(1.2);
        }
    }
}

.btn-small{

    margin-top: 0;
    
}

.sendcomment{
   margin-top: 2vw;
    display: flex;
    align-items: center;
    width: 90%;

}
</style>
