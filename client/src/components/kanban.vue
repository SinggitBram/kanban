<template>
  <div>
    <div id="kanbanutama" class="d-flex container mt-3">
      <div>
        <button v-on:click="logoutuser" id="tombollogout" class="btn btn-success">Logout</button>
      </div>

      <div class="task">
        <button id="addaddtask" type="submit" class="btn btn-info mt-3">Add Task</button>
      </div>
      <div id="mainkanban" class="utama d-flex row">
        <div id="backlog" class="kartu col-3 rounded">
          <div class="judulkartu rounded">
            <h6 class="mt-1">Backlog</h6>
          </div>
          <div class="isikartu bg-white rounded my-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima possimus doloribus suscipit
              illo
              amet exercitationem dolorem atque odit iusto rerum, culpa quam voluptas quia ad! Neque quae
              libero quas optio?
            </p>
          </div>
        </div>
        <div id="product" class="kartu col-3 rounded">
          <h6 class="mt-1">Product</h6>
          <div class="isikartu bg-white rounded my-2">task1</div>
          <div class="isikartu bg-white rounded my-2">task2</div>
        </div>
        <div id="development" class="kartu col-3 rounded">
          <h6 class="mt-1">Development</h6>

          <div id="app-0" class="isikartu bg-white rounded my-2"></div>
        </div>
        <div id="done" class="kartu col-3 rounded">
          <h6 class="mt-1">Done</h6>
          <div class="isikartu bg-white rounded my-2">task1</div>
          <div class="isikartu bg-white rounded my-2">task2</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var baseURL = `http://localhost:3000`;
export default {
  methods: {
    logoutuser() {
      localStorage.clear();
      this.islogin = false;
      this.loginemail = ``;
      this.loginpassword = ``;
      this.registername = ``;
      this.registeremail = ``;
      this.registerpassword = ``;
    }
  },
  gettask() {
    axios({
      method: "get",
      url: `${baseURL}/tasks`,
      headers: { token: localStorage.getItem("token") }
    })
      .then(result => {})
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>