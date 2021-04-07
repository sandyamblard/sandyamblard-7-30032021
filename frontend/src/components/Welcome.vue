<template>
    <div class="welcome">
        <h1>Bienvenue sur le réseau social de Groupomania !</h1>
        <div class="group-btn">
            <div class="btn" role="button" @click="toggleSignup">S'inscrire</div>
            <div class="btn" role="button" @click="toggleLogin">Se connecter</div>
        </div>
        <p>{{essai}}</p>
        <!--si s'inscrire choisi : -->
        <form class="form-welcome" v-if="signup">
            <h2>Inscription rapide :</h2>
            <div class="from-group">
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" placeholder="*" required>
            </div>
             <div class="from-group">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" placeholder="*" required>
            </div>
            <div class="from-group">
                <label for="mail">E-mail :</label>
                <input type="email" id="mail" placeholder="*" required>
            </div>
            <div class="from-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" placeholder="*" required>
            </div>
            <div class="from-group">
                <label for="date">Date de naissance :</label>
                <input type="date" id="date">
            </div>
            <div class="from-group">
                <label for="file">Photo de profil :</label>
                <input type="file" id="file">
            </div>
            <button class="btn">Inscription</button>
        </form>
        <!--si se connecter choisi : -->
        <form v-if="login" class="form-welcome">
            <h2>Connection rapide :</h2>
            <div class="from-group">
                <label for="mail">E-mail :</label>
                <input type="email" id="mail" placeholder="*" required>
            </div>
            <div class="from-group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" placeholder="*" required>
            </div>
            <button class="btn">Connection</button>
        </form>
        <img src="../../public/img/logoabove.png" alt="logo Groupomania" >
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            signup: false,
            login:false,
            
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
        }
    },
    created(){
        axios.get('http://localhost:3000/api/auth/users')
        .then((resp)=> console.log(resp.data))
        .catch(err => console.log(err))
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