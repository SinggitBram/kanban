<template>
  <div>
    <Login @statustoken="changeislogin" @googlebind="inisigngoogle" v-if="!islogin"></Login>

    <div v-if="islogin" class="row" style="width: 100vw">
      <Backlog :task="tasks" class="col" @emitGetTask="gettask"></Backlog>
      <Production :task="tasks" class="col" @emitGetTask="gettask"></Production>
      <Development :task="tasks" class="col" @emitGetTask="gettask"></Development>
      <Done :task="tasks" class="col" @emitGetTask="gettask"></Done>
      
        <div>
          
            <modal height="auto" :scrollable="true" name="addtask">
              <div id="divadd" class="container my-3">
                    <h2>Add Task</h2>
                    <form v-on:submit.prevent="submitaddtask" id="add-form">
                        <div class="form-group">
                            <label for="usr">Title:</label>
                            <input v-model="addtitle" type="text" class="form-control" id="titleadd" name="title">
                        </div>
                        <div class="form-group">
                            <label for="pwd">Description:</label>
                            <input v-model="adddescription" type="text" class="form-control" id="descriptionadd" name="description">
                        </div>
                        <div class="form-group">
                            <label for="pwd">Category:</label>
                            <select v-model="addcategory" class="form-control" id="descriptionadd" name="description">
                                <option>backlog</option>
                                <option>production</option>
                                <option>development</option>
                                <option>done</option>
                            </select>                          
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </modal>

            <div>
              <button @click="show" type="button" class="btn btn-success mb-2">ADD TASK</button>
        </div>
        <div>
              <button @click="logoutuser" type="button" class="btn btn-danger mb-2">LOGOUT</button>
        </div>
    </div>
</div>
  </div>
</template>

<script>
var baseURL = `https://morning-ocean-05803.herokuapp.com/`;

import axios from "axios";
import Login from "./components/login.vue";
import Backlog from "./components/backlog.vue";
import Production from "./components/production.vue";
import Development from "./components/development.vue";
import Done from "./components/done.vue";
export default {
  components: {
    Login,
    Backlog,
    Production,
    Development,
    Done
  },
  data() {
    return {
      islogin: localStorage.getItem("token") ? true : false,
      tasks: [],
      addtitle : ``,
      adddescription : ``,
      addcategory : ``

    };
  },
  methods: {
    inisigngoogle(tokengoogle){
      axios({
                method: "post",
                url: `${baseURL}users/googlelogin`,
                data: {
                    token: tokengoogle
                }
            })
                .then(data => {
                    localStorage.setItem("token", data.token)
                    this.islogin = true
                })
                .catch(err=>{
                  console.log(err)
                })
    },
    submitaddtask(){
      axios({
        method: "post",
        url: `${baseURL}tasks`,
        data: {
          title: this.addtitle,
          category : this.addcategory,
          description : this.adddescription
          },
        headers: { token: localStorage.getItem("token") }
      })
        .then(result => {
          this.$modal.hide("addtask");
          this.gettask()
      
        })

        .catch(err => {
          console.log(err);
        })
    },
    changeislogin(nilaitoken) {
      this.islogin = nilaitoken;
    },
    gettask() {
      axios({
        method: "get",
        url: `${baseURL}tasks`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(result => {
          this.tasks = [];
          result.data.forEach(element => {
            this.tasks.push(element);
          });
        })

        .catch(err => {
          console.log(err);
        });
    },
    logoutuser(){
      localStorage.clear()
      this.islogin = false
      var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    },
    show() {
      this.$modal.show("addtask");
    },
    hide() {
      this.$modal.hide("addtask");
    }
  },
  computed: {},
  created: function() {
    if (localStorage.getItem("token")) {
      this.gettask();
    }
  },
  watch: {
    islogin: function() {
      if (this.islogin == true) {
        this.gettask();
      }
    }
  }
};
</script>

<style scoped>
</style>