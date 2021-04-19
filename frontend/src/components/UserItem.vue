<template>
    <span class="useritem" @click="goToProfile(user.id)" @keyup.enter="goToProfile(user.id)" role='link' tabindex=0>
        {{user.firstname}} {{user.lastname}}
        <i v-if="!user.imageUrl" class="far fa-user" ></i>
        <img v-else :src="user.imageUrl" class="img-avatar" alt="photo du membre">
    </span>
</template>

<script>


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
        &:hover{
            box-shadow:  1px 1px 12px rgb(70, 69, 69);
        }
    }
}
.img-avatar{
    width: 60px;
    height: 60px;
    object-position: center;
    object-fit: cover;
    border: 2px rgb(148, 148, 148) solid;
}
.fa-user{
    color: gray;
    font-size: 1.7em;
    padding-left: 0.3em;
       
}
</style>
