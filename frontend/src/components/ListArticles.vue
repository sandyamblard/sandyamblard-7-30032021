<template>
<section>
    
    <article class='article-one dash--item' v-for="(article,index) in allArticles" :key=index @click='goArticle(article.id)'>
        <h3>{{ article.title }}</h3>
        <img :src="article.url" class='img-one-article'>
        <p>{{article.content}}</p>
        <!--p>De {{article.User.firstname}} {{article.User.lastname}}</p-->
        <p>De <useritem v-bind:user="article.User"></useritem> </p>

        <p>Likes : {{ article.likes }}</p>
        <p>Dernière modification: {{ article.updatedAt }}</p>
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
.article-one{
    flex : 60%;
}
.img-one-article{
        max-width: 70%;
        border-radius: 10px;
        margin: 1vw;
    }

.article-one{
    cursor: pointer;
}
.article-one a{
    text-decoration: none;
    color: inherit;
}
</style>