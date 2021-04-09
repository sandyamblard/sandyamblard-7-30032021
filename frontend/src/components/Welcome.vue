<template>
    <div class="welcome">
        <h1>Bienvenue sur le réseau social de Groupomania !</h1>
        <div class="group-btn">
            <div class="btn" role="button" @click="toggleSignup">S'inscrire</div>
            <div class="btn" role="button" @click="toggleLogin">Se connecter</div>
        </div>
        
        <!--si s'inscrire choisi : -->
        <form class="form-welcome" v-if="signup" @submit.prevent="sendUser">
            <h2>Inscription rapide :</h2>
            <div class="from-group">
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" placeholder="*" required v-model="firstname">
            </div>
            <div class="from-group">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" placeholder="*" required v-model="lastname">
            </div>
            <div class="from-group">
                <label for="mail">E-mail :</label>
                <input type="email" id="mail" placeholder="*" required v-model="email">
            </div>
            <div class="from-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" placeholder="*" required v-model="password">
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
            <button class="btn" >Inscription</button>
        </form>
       
        <!--si se connecter choisi : -->
        <form v-if="login" class="form-welcome"  @submit.prevent="connectUser">
            <h2>Connection rapide :</h2>
            <div class="from-group">
                <label for="mail">E-mail :</label>
                <input type="email" id="mail" placeholder="*" required v-model="email">
            </div>
            <div class="from-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" placeholder="*" required v-model="password">
            </div>
            <button class="btn" >Connection</button>
        </form>
        <img src="../../public/img/logoabove.png" alt="logo Groupomania" >
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Welcome",
    data() {
        return {
            signup: false,
            login:false,
            firstname:"",
            lastname:"",
            password:"",
            email:"",
            birthdate: null,
            file: "",
            description:"   ",
            envoi: ""
        }
    },
    methods: {
        toggleSignup : function(){
            this.signup = true;
            this.login = false;
        },
        toggleLogin: function(){
            this.login= true;
            this.signup = false;
        },
        goDashboard(){
            this.$router.push('dashboard');
        },
        sendUser: function(){
            const envoi = { firstname:this.firstname, 
                lastname: this.lastname, 
                password: this.password, 
                email: this.email, 
                birthdate: this.birthdate,
                description: this.description
                }
            const envoibis = { 
                password: this.password, 
                email: this.email
                }
            console.log(envoi);
            axios.post('http://localhost:3000/api/auth/signup', envoi)
            .then (resp => {console.log(resp); console.log(envoibis);
                axios.post('http://localhost:3000/api/auth/login', envoibis)
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
                    this.$store.isAdmin= resp.data.isAdmin
                    console.log(this.$store.userId, this.$store.token, this.$store.isAdmin),
                    this.goDashboard()})
                .catch (err => console.log(err))
            })
            .catch (err => console.log(err))
        },
        connectUser: function(){
            const envoi = { 
                password: this.password, 
                email: this.email, 
                }
            axios.post('http://localhost:3000/api/auth/login', envoi)
                .then(resp => {
                    this.password="",
                    this.email="",
                    this.envoi="",
                    this.$store.userId= resp.data.userId,
                    this.$store.token= resp.data.token,
                    this.$store.isAdmin= resp.data.isAdmin
                    console.log(this.$store.userId, this.$store.token, this.$store.isAdmin),
                    this.goDashboard()
                })
                .catch (err => console.log(err))
        }
    }
    

}
</script>

<style lang="scss" scoped>
h1{
    
    margin-top: 4vw;
}
.welcome{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & img{
        width: 60vw;
    }
}
.form-welcome{
    width: 60%;
    margin-top: 4vw;
}

</style>



