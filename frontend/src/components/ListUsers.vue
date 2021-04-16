<template>
<aside class='users-list dash--item'>   
    <h2>Membres inscrits 
        <i class="fas fa-caret-down mob-only" ></i>
    </h2>
    <div v-for="(user,index) in allUsers" :key=index class="user-item" >
        <div class="img-user">
            <i v-if="!user.imageUrl" class="far fa-user" @click='goUser(user.id)'></i>
            <img v-else :src="user.imageUrl" alt="" class="img-avatar" @click='goUser(user.id)'>
            
        </div>
        <p @click='goUser(user.id)'>{{ user.firstname }} {{ user.lastname }} </p>
        
    </div>
    <i class="fas fa-caret-up mob-only"></i>
    
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
        axios.get('http://localhost:3000/api/auth/users', {headers: {Authorization: 'Bearer ' + this.$store.token,}})
        .then((resp)=> {console.log(resp.data);
            this.allUsers = resp.data})
        .catch(err => console.log(err))
    },
    methods:{
        goUser(identif){
            this.$router.push(`/user/${identif}`);
        }
    }

}
</script>

<style lang="scss" scoped>


.fa-user{
    color: gray;
    font-size: 2em;
    cursor: pointer;
    
}
.users-list{
    
    flex : 30%;
}

.img-user{
    object-fit: fit;
    width: 50px;
    height: 50px;
    line-height: 1em;
    border-radius: 50%;
    //border : 1px gray dotted;
    margin-left: 0.5rem;
    margin-right: 0.8rem;
    text-align: center;
    
}

.img-avatar{
   /* width: 50px;
    height : 50px;*/
    display: block;
    object-fit: cover;
}

.user-item{
    display: flex;
    margin-bottom: 1em;
    margin-top: 1.5em;
    color: rgb(54, 54, 54);
    font-size: 1.05em;
    & p,
    & img{
        cursor: pointer;
        
    }
    & img:hover{
            box-shadow: 2px 2px 8px gray;
        }
    & p:hover{
        text-decoration: underline;
    }
}
</style>