<template>

  <router-view :key="$route.path"/>
</template>



<script>
</script>

<style lang="scss">
*{box-sizing: border-box;}

body{
  margin: 0;
   background-color: lightgrey;
 
}
$color-primary : rgb(11, 11, 119);

#nav{display: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1e1e1f;
  margin: 0px;
  background-color: lightgrey;
  min-height: 100vh;

}

h1{
    color: rgb(11, 11, 119);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0.7em;
    margin-right: 0.7em;
    &::after{
        content:'';
        display: block;
        height: 4px;
        width: 9rem;
        background-color: rgb(202, 61, 61);
        margin-top: 0.4em;
    }
}

.group-btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
  padding: 1.5rem;
  background-color: rgb(20, 119, 119);
  border-radius: 15px;
  margin-left: 2vw;
  margin-right: 2vw;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 4vw;
  opacity : 0.9;
  &:hover{
    transform: scale(1.05);
    opacity : 1;
    transition :all 0.3s
  }
  &:focus{
    box-shadow: 0 0 15px green  ;
  }
}
.btn-admin{
    background-color: rgb(202, 61, 61);
    
}

.from-group {      
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media all and (min-width: 767px){
    flex-direction: row;
    align-items: center;
  }

    } 

label {
    flex: none;
}      
input, textarea{
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid rgb(21, 21, 83);
    outline: none;
    width: 95%;
    margin: 0.5rem;
    @media all and (min-width: 767px){
    flex: auto;
    }
    &:focus{
        border-color: rgb(52, 13, 61) ;
    }
}
button{
  border-color: transparent;
  font-family: inherit;
  font-size: inherit;
}

.img-avatar{
    max-width: 50px;
    border-radius: 50%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
.img-mini{
    width: 150px;
}

.admin-area,
.author-area{
    border-radius: 10px;
    @media all and (min-width: 767px){
    display: flex;
    justify-content: space-around;
    }
}

.fa-user-edit,
.fa-trash-alt{
    font-size: 1.5em;
    margin-left: 0.5em;
}

.mob-only{
    font-size: 2em;
    @media all and (min-width: 1024px){
        display: none;
    }    
}

.desk-only{
    display: none;
    @media all and (min-width: 1024px){
        display: inline;
    }    
}


.warning{
    color :rgb(194, 33, 33);
    font-weight: bold;
    & .fa-exclamation-triangle{
        font-size: 1.9em;
        margin-right: 0.5em;
    }
}

.appear-anim{
    animation-name: entreeforms;
    animation-duration: 0.4s;
    animation-iteration-count: 1;
    animation-fill-mode: both;
}

@keyframes entreeforms {
  0% {
    transform: scaleY(0);
    opacity: 0;
    animation-timing-function: ease-in;
    transform-origin: top;
  }
  50% {
    transform: translateY(0.5);
    opacity: 0.3;
    animation-timing-function: linear;
    transform-origin: top
  }
  75% {
    transform: translateY(0.6);
    opacity: 0.4;
    animation-timing-function: linear;
    transform-origin: top
  }
  100% {
    transform: translateY(1);
    opacity: 1;
    animation-timing-function: ease-out;
    transform-origin: top
  }
}
</style>

