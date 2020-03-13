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
        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
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
                <input v-model="registerpassword" type="password" class="form-control" placeholder="Password" id="passwordregister"
                    name="password">
                    <input type="checkbox" @click="myfunction">Show Password
            </div>
            <button id="tombolsubmitregister" type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div>
            <button v-on:click="swaploginregister" id="tombollogin" class="btn btn-success">Go to Login</button>
        </div>
        <div>
              <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
        </div>
</div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from "axios"
var baseURL = `http://localhost:3000`
export default{
    components: {
            GoogleLogin
        },
    data: function(){
        return{
        
        register_login: false,
        loginemail: ``,
        loginpassword: ``,
        registername: ``,
        registeremail: ``,
        registerpassword: ``,
        params: {
                client_id: "29760818398-00bf5bm48dua8i04uii7sgjf1fmd2n1i.apps.googleusercontent.com"
                },
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
        }  
    },
    methods: {

        onSuccess(tokengoogle){
            var id_token = tokengoogle.getAuthResponse().id_token;
            this.$emit("googlebind", id_token)
        },
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
                    this.loginemail = ``;
                    this.loginpassword = ``;
                    this.registername = ``;
                    this.registeremail = ``;
                    this.registerpassword = ``;
                    this.$emit('statustoken', true);

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
        myfunction(){
            var x = document.getElementById("passwordregister");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
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
                    this.loginemail = ``;
                    this.loginpassword = ``;
                    this.registername = ``;
                    this.registeremail = ``;
                    this.registerpassword = ``;
                    this.$emit('statustoken', true);

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