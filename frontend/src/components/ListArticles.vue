<template>
<section class="list-articles">
    <h2 >Fil d'actualité</h2>
    <article class='article-one dash--item' v-for="(article,index) in allArticles" :key=index >
        <div class="article-content" @click='goArticle(article.id)' title="Voir l'article">
            <h3>{{ article.title }}</h3>
            <span v-if="article.url"><img :src="article.url" class='img-one-article'></span>
            <p>{{article.content}}</p>  
        </div>
        <!--p>De {{article.User.firstname}} {{article.User.lastname}}</p-->
        <div class="footer-article">
            <p>Le {{ article.createdAt }}</p>
            <p>Par <useritem v-bind:user="article.User"></useritem> </p>
        </div>


        <!--p>Likes : {{ article.likes }}</p-->
        
    </article>

</section>
</template>

<script>
import axios from 'axios';
import UserItem from '@/components/UserItem.vue'


export default {
    name: 'ListArticles',
    components: {
        'useritem': UserItem
    },
    data(){
        return{
            allArticles: ''
        }
    },created(){
        axios.get('http://localhost:3000/api/articles')
        .then((resp)=> {console.log(resp.data);
            this.allArticles = resp.data})
        .catch(err => console.log(err))
    },
    methods:{
        goArticle(identif){
            this.$router.push(`/article/${identif}`);
        }
    }

}
</script>

<style lang="scss">

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
        /*text-overflow: ellipsis; 
        
        white-space: nowrap
        */

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
}
</style>