<template>
<section>
    
    <article class='article-one dash--item' v-for="(article,index) in allArticles" :key=index @click='goArticle(article.id)'>
        <h3>{{ article.title }}</h3>
        <img :src="article.url">
        <p>{{article.content}}</p>
        <p>By {{article.User.firstname}} {{article.User.lastname}}</p>
        <p>Likes : {{ article.likes }}</p>
        <p>Dernière modification: {{ article.updatedAt }}</p>
    </article>

</section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ListArticles',
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
            console.log(identif)
            this.$router.push(`/article/${identif}`);
        }
    }

}
</script>

<style lang="scss">
.article-one{
    flex : 60%;
    & img{
        max-width: 80%;
        border-radius: 10px;
    }
}

.article-one{
    cursor: pointer;
}
.article-one a{
    text-decoration: none;
    color: inherit;
}
</style>