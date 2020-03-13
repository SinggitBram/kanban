<template>
  <div>
    <div id="kanbanutama" class="d-flex container mt-3">
      <div id="mainkanban" class="utama d-flex flex-column">
        <h6 class="mt-1">DEVELOPMENT</h6>
        <div v-for="(data,idx) in developmentdata" class="flex-column col bg-dark my-1 rounded" :key="data.id">
          <div class="isikartu bg-white rounded my-2">Title: {{data.title}}</div>
          <div class="isikartu bg-white rounded my-2">Description: {{data.description}}</div>
          <div>
            <button @click="deleteTask(data.id)" type="button" class="btn btn-danger mb-2">Delete</button>
          </div>
          <div>
            <button @click="show(idx,data.id)" type="button" class="btn btn-info mb-2">Edit</button>
          </div>
        </div>
      </div>
    </div>

            <div>
          
            <modal height="auto" :scrollable="true" name="edittaskdevelopment">
              <div id="divedit" class="container my-3">
                    <h2>Edit Task</h2>
                    <form v-on:submit.prevent="submitedittask" id="add-form">
                        <div class="form-group">
                            <label for="usr">Title:</label>
                            <input v-model="edittitle" type="text" class="form-control" id="titleadd" name="title">
                        </div>
                        <div class="form-group">
                            <label for="pwd">Description:</label>
                            <input v-model="editdescription" type="text" class="form-control" id="descriptionadd" name="description">
                        </div>
                        <!-- <div class="form-group">
                            <label for="pwd">Category:</label>
                            <input v-model="editcategory" type="text" class="form-control" id="categoryadd" name="category">
                        </div> -->
                        <div class="form-group">
                            <label for="pwd">Category:</label>
                            <select v-model="editcategory" class="form-control" id="categoryadd" name="category">
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

            </div>
  </div>
</template>

<script>
import axios from "axios";
var baseURL = `http://localhost:3000`;
export default {
  props: ["task"],
  computed: {
    developmentdata() {
      return this.task.filter(filter => filter.category == "development");
    }
  },
    data() {
    return {
      edittitle : ``,
      editdescription : ``,
      editcategory : ``,
      selectedTaskIndex : 0,
      iduntukedit : 0
    };
  },
  methods: {

    deleteTask(idku) {
      axios({
        method: "delete",
        url: `${baseURL}/tasks/${idku}`,
        headers: { token: localStorage.getItem("token") }
      })
      .then(result => {
          this.$emit("emitGetTask")
      })
      .catch(err=>{
          console.log(err)
      })
    },
    submitedittask(){
        axios({
        method: "put",
        url: `${baseURL}/tasks/${this.iduntukedit}`,
        data:{
          title: this.edittitle,
          category : this.editcategory,
          description : this.editdescription
        },
        headers: { token: localStorage.getItem("token") }
      })
      .then(result => {
          this.$modal.hide("edittaskdevelopment");
          this.$emit("emitGetTask")
      })
      .catch(err=>{
          console.log(err)
      })
    },
    show (iniidx,iniidedit) {
        this.iduntukedit = iniidedit
        this.selectedTaskIndex = iniidx
        this.edittitle = this.developmentdata[this.selectedTaskIndex].title
        this.editcategory = this.developmentdata[this.selectedTaskIndex].category
        this.editdescription = this.developmentdata[this.selectedTaskIndex].description
      this.$modal.show("edittaskdevelopment");
    },
    hide() {
      this.$modal.hide("edittaskdevelopment");
    }
  }
};
</script>

<style scoped>
</style>