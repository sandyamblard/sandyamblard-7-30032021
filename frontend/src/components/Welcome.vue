<template>
    <main class="welcome">
        <h1>Bienvenue sur le réseau social de Groupomania !</h1>
        <section v-if="userConnected" class='deconnexion' aria-label='se déconnecter'>
            <div class='btn' @click="goHome" @keyup.enter="goHome" role="button" tabindex=0> Se déconnecter  <i class='fas fa-power-off' title="se déconnecter"></i></div>
        </section>

        <section v-else class='connection' aria-label="s'inscrire ou se connecter">
            <div class="group-btn">
                <div class="btn-empty" role="button" tabindex=0 @click="toggleSignup" @keyup.enter="toggleSignup">S'inscrire</div>
                <div class="btn-empty-left" role="button" tabindex=0 @click="toggleLogin" @keyup.enter="toggleLogin">Se connecter</div>
            </div>
            
            <!--si s'inscrire choisi : -->
            <form class="form-welcome appear-anim" v-if="signup" @submit.prevent="sendUser" aria-label="inscription">
                <h2>Inscription rapide :</h2>
                <div class="from-group">
                    <label for="prenom">Prénom :</label>
                    <input type="text" id="prenom" placeholder="*" required v-model="firstname" @focus="cancelError">
                </div>
                <div class="from-group">
                    <label for="nom">Nom :</label>
                    <input type="text" id="nom" placeholder="*" required v-model="lastname" @focus="cancelError">
                </div>
                <div class="from-group">
                    <label for="mail">E-mail :</label>
                    <input type="email" id="mail" placeholder="*" required v-model="email" @focus="cancelError">
                </div>
                <div class="from-group">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" placeholder="*" required v-model="password" @focus="cancelError">
                </div>
                <div class="from-group">
                    <label for="date">Date de naissance :</label>
                    <input type="date" id="date" v-model="birthdate" @focus="cancelError">
                </div>
                <div class="from-group">
                    <label for="file">Photo de profil :</label>
                    <input type="file" id="file" ref='file' @change='showFileSelected' accept="image/*" @focus="cancelError">
                </div>
                <div class="from-group">
                    <label for="description">Biographie :</label>
                    <input type="text" id="description"  v-model="description" @focus="cancelError">
                </div>
                <button class="btn" >Inscription</button>
            </form>
            
        
            <!--si se connecter choisi : -->
            <form v-if="login" class="form-welcome  appear-anim"  @submit.prevent="connectUser" aria-label="connection">
                <h2>Connection rapide :</h2>
                <div class="from-group">
                    <label for="mail">E-mail :</label>
                    <input type="email" id="mail" placeholder="*" required v-model="email" @focus="cancelError">
                </div>
                <div class="from-group">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" placeholder="*" required v-model="password" @focus="cancelError">
                </div>
                <button class="btn" >Connection</button>
            </form>

            <div class="form-welcome" v-if="!login&&!signup">
                <div><i class="fas fa-comments"></i></div>
                Inscrivez-vous en quelques secondes et discuter avec vos collègues de l'entreprise, en toute convivialité !
                <div><i class="fas fa-comments"></i></div>
            </div>
            <p class="warning" v-if="error"><i class="fas fa-exclamation-triangle"></i>{{error}}</p>
        </section>
        <img class='logo-big' src="../../public/img/logoabove.png" alt="logo Groupomania" >
        
    </main>
</template>

<script>
import axios from 'axios'
//import { bus } from '../main'
import { emitter } from '../main'

export default {
    name: "Welcome",
    data() {
        return {
            
            userConnected: false,
            signup: false,
            login:false,
            firstname:"",
            lastname:"",
            password:"",
            email:"",
            birthdate: null,
            file: "",
            description:"   ",
            envoi: "",
            error: ''
        }
    },
    
    created(){
        if(this.$store.userId){ this.userConnected = true}
    }
    ,
    methods: {
        toggleSignup : function(){
            this.signup = true;
            this.login = false;
            document.querySelector('.btn-empty').style.backgroundColor = 'rgb(11, 11, 119)';
            document.querySelector('.btn-empty').style.color = 'white';
            document.querySelector('.btn-empty-left').style.backgroundColor = 'white';
            document.querySelector('.btn-empty-left').style.color = 'rgb(11, 11, 119)';
        },
        toggleLogin: function(){
            this.login= true;
            this.signup = false;
            document.querySelector('.btn-empty').style.backgroundColor = 'white';
            document.querySelector('.btn-empty').style.color = 'rgb(11, 11, 119)';
            document.querySelector('.btn-empty-left').style.backgroundColor = 'rgb(11, 11, 119)';
            document.querySelector('.btn-empty-left').style.color = 'white';
        },
        goDashboard(){
            this.$router.push('dashboard');
        },
        showFileSelected: function(){
            this.file = this.$refs.file.files[0];
            console.log('fileSelectd : ' , this.file)
        }
        ,

        goHome(){
            //console.log('go home')
            this.$store.userId = "";
            this.$store.token = "";
            this.$store.firstname = "",
            this.$store.isAdmin = false;
            this.userConnected = false;     
            emitter.emit('updateHeader'); 
        }
        ,

        cancelError : function(){
            this.error = ''
        },

        sendUser: function(){
            const envoi = new FormData();
            envoi.append('firstname', this.firstname);
            envoi.append('lastname', this.lastname);
            envoi.append('email', this.email);
            envoi.append('password', this.password);
            envoi.append('birthdate', this.birthdate);
            envoi.append('description', this.description);
            envoi.append('file', this.file)  
                console.log(envoi)
/*
            const envoi = { firstname:this.firstname, 
                lastname: this.lastname, 
                password: this.password, 
                email: this.email, 
                birthdate: this.birthdate,
                description: this.description
                }

                */
            const envoibis = { 
                password: this.password, 
                email: this.email
                }
                //enregistr l'user
            axios.post('http://localhost:3000/api/auth/signup', envoi, {headers: {Authorization: 'Bearer ' + this.$store.token}})
            .then (resp => {console.log(resp); console.log(envoibis);
            //et se connecter dans la foulée
                axios.post('http://localhost:3000/api/auth/login', envoibis, {headers: {Authorization: 'Bearer ' + this.$store.token}})
                .then(resp => {
                    console.log(resp);
                    this.firstname ="",
                    this.lastname="",
                    this.password="",
                    this.email="",
                    this.birthdate="",
                    this.envoi="",
                    this.envoibis="",
                    this.$store.userId= resp.data.userId,
                    this.$store.token= resp.data.token,
                    this.$store.firstname= resp.data.firstname,
                    this.$store.isAdmin= resp.data.isAdmin
                    console.log(this.$store.userId, this.$store.token, this.$store.isAdmin),
                    this.goDashboard()})
                .catch (err => {console.log(err); this.error= err.response.data.error})
            })
            .catch (err => {console.log(err); this.error= err.response.data.error})
        },
        connectUser: function(){
            const envoi = { 
                password: this.password, 
                email: this.email, 
                }
            axios.post('http://localhost:3000/api/auth/login', envoi, {headers: {Authorization: 'Bearer ' + this.$store.token}})
                .then(resp => {
                    this.password="",
                    this.email="",
                    this.envoi="",
                    this.$store.userId= resp.data.userId,
                    this.$store.token= resp.data.token,
                    this.$store.firstname= resp.data.firstname,
                    this.$store.isAdmin= resp.data.isAdmin
                    console.log(this.$store.userId, this.$store.token, this.$store.isAdmin),
                    this.goDashboard()
                })
                .catch (err => {console.log(err);
                        this.error= err.response.data.error})
        }
    }
    

}
</script>

<style lang="scss" scoped>
$color-primary : rgb(11, 11, 119);

h1{
    
    margin-top: 4vw;
}
.fa-comments{
    font-size: 2em;
    color: $color-primary;margin: 0.5em;
}
.welcome{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & img{
        width: 60vw;
        margin-top: 10vw;
         @media all and (min-width: 1200px){
        width: 30vw;
    }
    }
    @media all and (min-width: 767px){
    padding-top: 50px;
    }
}

.connection{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-welcome{
    border-radius: 10px;
    background-color: rgb(238, 237, 237);
    border : rgb(11, 11, 119) 1px solid;
    padding: 1vw;
    color : rgb(11, 11, 119);
    font-weight: normal; 
    font-size: 1.2rem;
    width: 95%;
    @media all and (min-width: 767px){
        width: 80%;
     }
    @media all and (min-width: 1024px) {
        width: 60%;
    }
    
    //margin-top: 4vw;
    
    
}


.btn-empty{
  padding: 1.5rem;
  background-color: white;
  border : 2px $color-primary solid;
  border-radius:  15px 0px 0 0;
  margin-bottom: -0.5em;
  color: $color-primary;
  font-weight: bold;
  cursor: pointer;
  margin-top: 4vw;
  &:hover{
    background-color: $color-primary;
    transition : 0.3s;
    color : white;
    text-decoration: underline;
  }
    &:focus{
    box-shadow: 0 0 15px rgb(20,119,119)      ;
  }
}

.btn-empty-left{
  padding: 1.5rem;
  background-color: white;
  border : 2px $color-primary solid;
  border-radius:  0 15px 0 0;
  margin-bottom: -0.5em;
  margin-left: -0.2em;
  color: $color-primary;
  font-weight: bold;
  cursor: pointer;
  margin-top: 4vw;
  &:hover{
    background-color: $color-primary;
    transition : 0.3s;
    color : white;
    text-decoration: underline;
  }
    &:focus{
    box-shadow: 0 0 15px rgb(20,119,119)          ;
  }
}

.fa-power-off{
    font-size: 2em;
    margin-left: 0.5em;
}

.warning{
    color :rgb(194, 33, 33);
    font-weight: bold;
    & .fa-exclamation-triangle{
        font-size: 1.9em;
        margin-right: 0.5em;
    }
}

</style>



