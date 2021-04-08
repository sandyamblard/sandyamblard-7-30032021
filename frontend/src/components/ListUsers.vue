<template>
<aside class='users-list dash--item'>   
    <h2>Membres inscrits </h2>
    <div v-for="(user,index) in allUsers" :key=index class="user-item">
        <img :src="user.imageUrl" alt="" class="img-avatar">
        <p>{{ user.firstname }} {{ user.lastname }}</p>
    </div>

    
</aside>     
</template>

<script>
import axios from 'axios';

export default {
    name: 'ListUsers',
    data(){
        return{
            allUsers: ''
        }
    },created(){
        axios.get('http://localhost:3000/api/auth/users')
        .then((resp)=> {console.log(resp.data);
            this.allUsers = resp.data})
        .catch(err => console.log(err))
    }

}
</script>

<style lang="scss" scoped>
.users-list{
    
    flex : 40%;
}
.img-avatar{
    max-width: 50px;
    border-radius: 50%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

.user-item{
    display: flex;
}
</style>