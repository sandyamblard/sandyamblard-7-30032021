<template>
<aside class='users-list dash--item'>   
    <h2>Membres inscrits </h2>
    <ul>
        <li v-for="(user,index) in allUsers" :key=index>{{ user.firstname }} {{ user.lastname }}</li>
    </ul>
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
</style>