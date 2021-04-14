<template><div>
<topbar></topbar> 
<main>
    <h1>{{userData.firstname}} {{userData.lastname}}</h1>
    <section class="user-card">
        <span v-if="userData.imageUrl"><img :src="userData.imageUrl" alt="" class="avatar"></span>
        <p>Biographie : <span>{{userData.description}}</span></p>
        <p>Anniversaire : <span v-if='userData.birthdate'>{{anniversaire(userData.birthdate)}}</span><span v-else>Non communiqué</span></p>

        <p>Membre inscrit depuis le :<span>{{dateInscription(userData.createdAt)}}</span></p>
        <p class='admin' v-if="userData.isAdmin">Administrateur du réseau</p>
    </section>    
    <section class="editprofil">    
        <div v-if="userConnected">
            <div class="author-area">
            <div @click="modifProfil" class='btn'> Editer mon profil<i class="fas fa-user-edit" ></i> </div>
            <form v-if="modifyProfil" @submit.prevent="editProfil" class="form-modify">
                <div><i class="fas fa-caret-up"  @click="closeFormEdit" role=button></i></div>
                <!--div @click="closeFormEdit" class="close" role=button>X</div-->
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
                    <input type="file" id="file" accept="image/*">
                </div>
                <div class="from-group">
                    <label for="description">Biographie :</label>
                    <input type="text" id="description"  v-model="description">
                </div>
                <button class="btn" >Modifier</button>
            </form>
            <div @click="modifPass" class='btn'> Modifier mes codes d'accès<i class="fas fa-key" ></i> </div>
            <form v-if="modifyPass" @submit.prevent="editPass" class="form-modify"> 
                <div><i class="fas fa-caret-up"  @click="closeFormPass" role=button></i></div>
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
            <div class='btn' @click="deleteUser">Supprimer mon profil <i class="fas fa-trash-alt"></i></div>
        </div>
        <div class='btn btn-admin' @click="deleteUser" v-if='$store.isAdmin'>Supprimer ce membre <br>
         ACCES ADMINISTRATEUR
         <i class="fas fa-exclamation-triangle"></i></div>
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
            imageUrl: null,
            password:'',
            email:'',

           

        }
    },methods:{
        anniversaire : function(string){
            const date = new Date(string);
            return date.toLocaleString('fr-FR', {month: 'long', day:'numeric'} )
             
        },
        dateInscription : function(string){
            const date = new Date(string);
            return date.toLocaleString('fr-FR', {year: 'numeric', month: 'long', day:'numeric'} )
             
        },
        modifProfil: function(){
            this.modifyProfil= true;
            this.modifyPass= false;
        },
        modifPass: function(){
            this.modifyPass= true;
            this.modifyProfil= false;
        },
        closeFormEdit :function(){
            this.modifyProfil= false;
        } 
        ,closeFormPass :function(){
            this.modifyPass= false;
        } 
        ,
        editProfil: function(){
            const envoi = {
                firstname: this.firstname,
                lastname: this.lastname,
                birthdate: this.birthdate,
                description: this.description
            }
            axios.put(`http://localhost:3000/api/auth/users/${this.id}`, envoi, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then( resp => {
                console.log(resp);
                this.userData.firstname = this.firstname;
                this.$store.firstname = this.firstname;
                this.userData.lastname = this.lastname;
                this.userData.birthdate = this.birthdate ;
                this.userData.description = this.description;
                this.modifyProfil= false;
            })
            .catch(err => console.log(err))
        }, 
        editPass: function(){
            const envoi = {
                password: this.password,
                email: this.email
            }
            axios.put(`http://localhost:3000/api/auth/users/${this.id}/pass`, envoi, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
            .then( resp => {console.log(resp);
                        this.modifyPass= false;
            })
            .catch(err => console.log(err))
        }, 
        deleteUser : function(){
            if(confirm('Etes-vous sûr de vouloir supprimer ce membre ?')){
              axios.delete(`http://localhost:3000/api/auth/users/${this.id}`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
                .then( resp => {
                    console.log(resp);
                    if(this.$store.isAdmin){
                        this.$router.push('/dashboard');
                    }else{
                        this.$store.userId = '';
                        this.$store.firstname = '';
                        this.$store.token = '';
                        this.$store.isAdmin = false;
                        this.$router.push('/')
                    }
                }
               )
                .catch(err => console.log(err))  
            }
            
        }
    },
    created(){
        if(this.$store.userId == this.$route.params.id){
            this.userConnected= true;
            
        }
        axios.get(`http://localhost:3000/api/auth/users/${this.id}`, {headers: {Authorization: 'Bearer ' + this.$store.token,}})
        .then((resp)=> {
            console.log(resp.data);
           this.userData = resp.data;
           this.firstname = resp.data.firstname,
           this.lastname= resp.data.lastname,
           this.birthdate = resp.data.birthdate,
           this.imageUrl = resp.data.imageUrl,
           this.description = resp.data.description})
        .catch(err => console.log(err))
    },
    
}
</script>

<style lang="scss" scoped>
img{
    max-width: 80%;
    border-radius: 50%;
    //box-shadow:  1px 1px 15px grey;
    border : ridge 5px grey;
}
main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media all and (min-width: 767px){
    padding-top: 45px;
    }
}
.user-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    border-radius: 15px;
    background-color: white;
    width: 95%;
    @media all and (min-width: 767px){
    width: 70%;
    }
}

span{
    font-weight: bold;
}

.admin{
    text-transform: uppercase;
    font-weight: bold;
    color: rgb(175, 26, 26);
}

.editprofil{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
    @media all and (min-width: 767px){
    width: 70%;
    }
}
.fas{
    font-size: 1.6em;
    padding-left: 1em;
}
.form-modify{
    border : rgba(20, 119, 119, 0.8) 2px dotted;
    border-radius: 10px;
    margin-top: -3vw;
    padding: 0.8em;
}
.close{
    width: 25px;
    height: 25px;
    background-color: rgb(175, 26, 26);
    border : 1px rgb(88, 14, 14) solid;
    color : white;
    font-size: 1.3em;
    padding: 0.2em;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 3vw;
}
.fa-caret-up{
    padding: 0.4em;
    margin-left: 0;
    margin-top: 1vw;
    font-size:2.8em;
    color : rgb(11,11,119)
}
.btn{
    opacity :1;
    
}


</style>
