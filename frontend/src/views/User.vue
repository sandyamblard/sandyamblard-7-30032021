<template><div>
<topbar></topbar> 
<main>
    <h1>{{userData.firstname}} {{userData.lastname}}</h1>
    <section>
        <img :src="userData.imageUrl" alt="">
        <p>Biographie : {{userData.description}}</p>
        <p>Anniversaire : {{userData.birthdate}}</p>
        <p>Membre inscrit depuis le :{{userData.createdAt}}</p>
        <p v-if="userData.isAdmin">ADMIN DU RESEAU</p>
        <div v-if="userConnected">
            <div @click="modifProfil" class='btn'> Editer mon profil<i class="fas fa-user-edit" ></i> </div>
                <form v-if="modifyProfil" @submit.prevent="editProfil">
                    <div class="from-group">
                        <label for="prenom">Prénom :</label>
                        <input type="text" id="prenom" placeholder="*" required v-model="firstname">
                    </div>
                    <div class="from-group">
                        <label for="nom">Nom :</label>
                        <input type="text" id="nom" placeholder="*" required v-model="lastname">
                    </div>
                    <div class="from-group">
                        <label for="date">Date de naissance :</label>
                        <input type="date" id="date" v-model="birthdate">
                    </div>
                    <div class="from-group">
                        <label for="file">Photo de profil :</label>
                        <input type="file" id="file">
                    </div>
                    <div class="from-group">
                        <label for="description">Biographie :</label>
                        <input type="text" id="description"  v-model="description">
                    </div>
                    <button class="btn" >Modifier</button>
                </form>
            <div @click="modifPass" class='btn'> Modifier mes codes d'accès<i class="fas fa-key" ></i> </div>
                <form v-if="modifyPass" @submit.prevent="editPass">       
                    <div class="from-group">
                        <label for="mail">E-mail :</label>
                        <input type="email" id="mail" placeholder="*" required v-model="email">
                    </div>
                    <div class="from-group">
                        <label for="password">Mot de passe :</label>
                        <input type="password" id="password" placeholder="*" required v-model="password">
                    </div>
                    <button class="btn" >Modifier</button>
                </form>
        </div>
    </section>
</main>
</div></template>

<script> 
import axios from 'axios';
import Header from '../components/Header.vue'

export default {
    name: 'User',
    components:{
        'topbar': Header
    },
    
    data(){
        return{
            id: this.$route.params.id,
            userData: '',
            userConnected: '',
            modifyProfil: false,
            modifyPass: false,
            firstname: '',
            lastname:'',
            birthdate: null,
            description: '   ',
            passwoed:'',
            email:''

        }
    },methods:{
        modifProfil: function(){
            this.modifyProfil= true;
            this.modifyPass= false;
        },
        modifPass: function(){
            this.modifyPass= true;
            this.modifyProfil= false;
        }, 
        editProfil: function(){
            const envoi = {
                firstname: this.firstname,
                lastname: this.lastname,
                birthdate: this.birthdate,
                description: this.description
            }
            axios.put(`http://localhost:3000/api/auth/users/${this.id}`, envoi)
            .then( resp => console.log(resp))
            .catch(err => console.log(err))
        }, 
        editPass: function(){
            const envoi = {
                password: this.password,
                email: this.email
            }
            axios.put(`http://localhost:3000/api/auth/users/${this.id}/pass`, envoi)
            .then( resp => console.log(resp))
            .catch(err => console.log(err))
        }, 
    },
    created(){
        if(this.$store.userId == this.$route.params.id){
            this.userConnected= true;
            
        }
        axios.get(`http://localhost:3000/api/auth/users/${this.id}`)
        .then((resp)=> {
            console.log(resp.data);
           this.userData = resp.data;})
        .catch(err => console.log(err))
    },
    
}
</script>

<style lang="scss" scoped>

</style>
