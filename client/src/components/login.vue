<template>
  <div>     
    <div v-if="!register_login " id="divlogin" class="container">
        <h2>Login</h2>
        <form v-on:submit.prevent="submitlogin" id="login-form">
            <div class="form-group">
                <label for="usr">Email:</label>
                <input v-model="loginemail" type="text" class="form-control" placeholder="Email" id="emaillogin"
                    name="name" required>
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input v-model="loginpassword" type="password" class="form-control" id="passwordlogin"
                    placeholder="Password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div>
            <button v-on:click="swaploginregister" id="tombolregister" class="btn btn-success">Go to
                Register</button>
        </div>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>

    <div v-if="register_login" id="divregister" class="container">
        <h2>Register</h2>
        <form v-on:submit.prevent="submitregister" id="register-form">
            <div class="form-group">
                <label for="usr">Name:</label>
                <input v-model="registername" type="text" class="form-control" id="nameregister" placeholder="Name" name="name">
            </div>
            <div class="form-group">
                <label for="pwd">Email:</label>
                <input v-model="registeremail" type="text" class="form-control" id="emailregister" placeholder="Email" name="email">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input v-model="registerpassword" type="password" class="form-control" placeholder="Login" id="passwordregister"
                    name="password">
            </div>
            <button id="tombolsubmitregister" type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div>
            <button v-on:click="swaploginregister" id="tombollogin" class="btn btn-success">Go to Login</button>
        </div>
</div>
  </div>
</template>

<script>
import axios from "axios"
var baseURL = `http://localhost:3000`
export default{
    data: function(){
        return{
        
        register_login: false,
        loginemail: ``,
        loginpassword: ``,
        registername: ``,
        registeremail: ``,
        registerpassword: ``
        }  
    },
    methods: {
        submitlogin() {
            axios({
                method: 'post',
                url: `${baseURL}/users/login`,
                data: {
                    email: this.loginemail,
                    password: this.loginpassword
                }
            })
                .then(result => {
                    localStorage.setItem(`token`, result.data.token)
                    this.$emit('statustoken', true)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        swaploginregister() {
            if (this.register_login) {
                this.register_login = false
            } else {
                this.register_login = true
            }
        },
        submitregister(){
            axios({
                method: 'post',
                url: `${baseURL}/users/register`,
                data: {
                    name: this.registername,
                    email: this.registeremail,
                    password: this.registerpassword
                }
            })
                .then(result => {
                    localStorage.setItem(`token`, result.data.token)
                    this.$emit('statustoken', true)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>
</style>