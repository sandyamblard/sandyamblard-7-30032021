<template>
    <span class="useritem" >
        
        <span @click="goToProfile(user.id)">{{user.firstname}} {{user.lastname}}</span>
        <img :src="user.imageUrl" class="img-avatar" @click.stop="goToProfile(user.id)">
    </span>
</template>

<script>
//import axios from 'axios';

export default {
    name: 'UserItem',
    data(){
        return{
            userData :''
        }
    }, 
    props : ["user"],
    methods: {
        goToProfile :function(identif){
            this.$router.push(`/user/${identif}`)
        }
    },
    created(){
        console.log('user de item: ', this.user)
        /*axios.get(`http://localhost:3000/api/auth/users/${this.userId}`)
        .then(resp => {console.log(resp.data);
            this.userData = resp.data;})
        .catch(err => console.log(err))*/
        //console.log('userId de userItem: ', this.userId)
    }
}
</script>

<style lang="scss" >
.useritem {
    background-color: lightseagreen;
    
     //display: flex;
     //justify-content: center;
     //align-items: center;
    & span:hover,
    & img:hover{
        text-decoration: underline;
        font-weight: bold;
        cursor: pointer;
        
    }
    & span,
    & img{
        vertical-align: middle;
    }
}
</style>
