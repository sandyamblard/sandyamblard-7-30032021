<template>
<section class="list-articles" aria-label='listes des messages'>
    <h2 >Fil d'actualité</h2>
    <article class='article-one dash--item' v-for="(article,index) in allArticles" :key=index >
        <div class="article-content" @click='goArticle(article.id)' @keyup.enter='goArticle(article.id)' title="Voir l'article" >
            <h3  @keyup.enter='goArticle(article.id)' role="button" tabindex=0>{{ article.title }}</h3>
            <span v-if="article.url"><img :src="article.url" class='img-one-article' alt='Photo du message'></span>
            <p>{{article.content}}</p>  
            <p><i class="fas fa-plus-circle" title='Voir le message en détail'  @keyup.enter='goArticle(article.id)' role="button" tabindex=0></i></p>
        </div>
        
        <div class="footer-article">
            <p>Le : {{ dateArticle( article.createdAt) }}</p>
            <p>Par <useritem v-bind:user="article.User"></useritem> </p>
        </div>
        
    </article>

</section>
</template>

<script>
import axios from 'axios';
import UserItem from '@/components/UserItem.vue'
import {emitter} from'../main'

export default {
    name: 'ListArticles',
    components: {
        'useritem': UserItem
    },
    data(){
        return{
            allArticles: '',
            
        }
    },
    computed: {
        
    }
    ,created(){
        axios.get('http://localhost:3000/api/articles', {headers: {Authorization: 'Bearer ' + this.$store.token,}})
        .then((resp)=> {
            this.allArticles = resp.data})
        .catch(err => console.log(err))
    },
    methods:{
        goArticle(identif){
            this.$router.push(`/article/${identif}`);
        },
        dateArticle : function(string){
            const date = new Date(string);
            return date.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day:'numeric', hour:'numeric', minute: 'numeric'} )
             
        }
    }, 
    mounted(){
        emitter.on('newMessageSent', ()=> 
                {console.log('evt reçu'); 
                axios.get('http://localhost:3000/api/articles', {headers: {Authorization: 'Bearer ' + this.$store.token,}})
                    .then((resp)=> {
                        this.allArticles = resp.data})
                    .catch(err => console.log(err))
                
                }) 
    }

}
</script>

<style lang="scss">

.useritem:focus{
    border: 2px dotted grey ; 
}
.fa-plus-circle:focus{
    border: 2px dotted rgb(20,119,119); 
}

.list-articles{
    flex : 70%;
}
.article-one{
    padding: 0.5em;
}
.article-content{
    cursor: pointer;
    border-bottom: dashed rgb(173, 173, 173) 1px;
    & p{
        font-weight: bold;
        max-height: 2.3em;
        overflow: hidden;
        text-overflow: clip; 
        

    }
}
.img-one-article{
        border : ridge 5px grey;
        border-radius: 10px;
        margin: 1vw;
        max-width: 95%;
    @media all and (min-width: 767px){    
        max-width: 70%;
    }  
        
    }

.article-one:hover{
    box-shadow: 1px 1px 10px grey;
    transform: scale(1.01);
    
}


.article-one a{
    text-decoration: none;
    color: inherit;
}


.footer-article{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
h3{
    text-decoration: underline;
    &:focus{
        border: 2px dotted rgb(20,119,119);
    }
}

.fa-plus-circle{
    font-size: 1.5em;
    color: rgb(139, 137, 137);
    cursor: pointer;
    @media all and (min-width: 767px){
         margin-right:1em;
    }
   
}
</style>