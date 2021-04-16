<template>
<aside class='users-list dash--item'>   
    <h2>Membres inscrits 
        <i class="fas fa-caret-down mob-only" @click='openUsersMob'></i>
    </h2>
    <div>
    <div v-for="(user,index) in allUsers" :key=index class="user-item" >
        <div class="img-user">
            <i v-if="!user.imageUrl" class="far fa-user" @click='goUser(user.id)'></i>
            <img v-else :src="user.imageUrl" alt="" class="img-avatar" @click='goUser(user.id)'>
            
        </div>
        <p @click='goUser(user.id)'>{{ user.firstname }} {{ user.lastname }} </p>
        
    </div>
    </div>
    <i class="fas fa-caret-up mob-only" @click='closeUsersMob'></i>
    
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
        axios.get('http://localhost:3000/api/auth/users'/*, {params: {userId: this.$store.userId}}*/, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
        .then((resp)=> {console.log(resp.data);
            this.allUsers = resp.data})
        .catch(err => console.log(err))
    },
    methods:{
        goUser(identif){
            this.$router.push(`/user/${identif}`);
        },
        openUsersMob : function(){
            document.querySelector('.users-list.dash--item').style.height = 'auto';
            document.querySelector('.users-list.dash--item').classList.add('appear-anim');
        },
        closeUsersMob : function(){
            document.querySelector('.users-list.dash--item').style.height = '5.5em';
            document.querySelector('.users-list.dash--item').classList.remove('appear-anim');
        }
    }

}
</script>

<style lang="scss" scoped>


.fa-user{
    color: gray;
    font-size: 2em;
    cursor: pointer;
    display: block;
    
}
.users-list{
    flex : 30%;
    height : 5.5em;
    overflow: hidden;
    @media all and (min-width: 1024px){
        height: auto;
        overflow: auto;
    }
}

.fa-caret-down{
margin-left: 2em;
font-size: 2em;
}
.fa-caret-up {
     color: rgb(11,11,119);
     font-size: 3em;
     padding: 0.5em;
}

.img-user{
    width: 60px;
    height: 60px;
    line-height: 1em;
    border-radius: 50%;
    //border : 1px gray dotted;
    margin-left: 0.5rem;
    margin-right: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.img-avatar{
    width: 60px;
    height : 60px;
    border : 2px rgb(204, 204, 204) solid;
    display: block;
    object-fit: cover;
    object-position: center;
    margin: 0;
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