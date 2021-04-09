<template>
    <div>
        <topbar></topbar> 
       <h1>{{ articleData.title }}</h1>
       <section >
           <div class="article-item">
               <img :src="articleData.url" alt="">
           <p> {{ articleData.content }}</p>
           <p> <img src="articleData.User.imageUrl" alt="">{{articleData.User.firstname}} {{articleData.User.lastname}}</p>
           <p>Ecrit le : {{ articleData.createdAt }}</p>
           <p>Dernière modification le : {{ articleData.updatedAt }}</p>
           <p class="showlikes" role="button" @click="showLikes" title="cliquer pour voir">
               {{ articleData.likes }} personnes aiment cet article</p>
               <!--likes  v-bind:listLikes="listLikes"></likes-->
               <div v-if="likeShowed"> 
                   <p v-for="(like, index) in listLikes" :key=index>{{like.user.firstname}} {{like.user.lastname}}</p>
                </div>
            
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
                   <div class="comment-item">
                        <p>{{comment.commContent}}</p>
                        <p>Par : {{comment.user.firstname}} {{comment.user.lastname}}</p>
                    </div>
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
            /*listLikes: 'essaipropos',*/
            commContent:'',
            
        }
    },
    created(){
        axios.get(`http://localhost:3000/api/articles/${this.id}`)
        .then((resp)=> {
            console.log(resp.data);
           this.articleData = resp.data})
        .catch(err => console.log(err));

        axios.get(`http://localhost:3000/api/articles/${this.id}/comments`)
            .then((resp)=> {
            console.log(resp.data);
           this.allComments = resp.data})
        .catch(err => console.log(err))
        
        
    },
    methods: {
        showLikes(){
            this.likeShowed= !this.likeShowed;
            if (this.likeShowed == true){
              axios.get(`http://localhost:3000/api/articles/${this.id}/likes`)
                .then ( (resp) => {
                    console.log(resp.data);
                    this.listLikes= resp.data;
                    //console.log(this.listLikes)
                })
                .catch(err => console.log(err))  
            }    
        },
        sendComment(){
            const envoi = {
                userId: this.$store.userId,
                commContent: this.commContent
            };
            console.log(envoi);
            axios.post(`http://localhost:3000/api/articles/${this.id}/comment`, envoi)
            .then( resp => console.log(resp))
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
    & img{
        max-width: 95%;
        border-radius: 10px;
        margin: 1vw;
    }
}

.comment-item{
    width: 80%;
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
</style>
