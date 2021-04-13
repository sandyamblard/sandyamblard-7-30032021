<template>
    <!--span class="useritem" >
        <span @click="goToProfile(user.id)">{{user.firstname}} {{user.lastname}}</span>
        <img :src="user.imageUrl" class="img-avatar" @click.stop="goToProfile(user.id)">
    </span-->
    <span class="useritem" @click="goToProfile(user.id)" >
        {{user.firstname}} {{user.lastname}}
        <i v-if="!user.imageUrl" class="far fa-user" ></i>
        <img v-else :src="user.imageUrl" class="img-avatar" >
        
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
    cursor: pointer;
    &:hover{
        text-decoration: underline;

        
    }
    
    & span,
    & img{
        vertical-align: middle;

    }
    & img{
        box-shadow:  1px 1px 8px grey;
    }
}
.fa-user{
    color: gray;
    font-size: 1.7em;
    padding-left: 0.3em;
       
}
</style>
