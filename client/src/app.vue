<template>
  <div>
    <Login @statustoken="changeislogin" v-if ="!islogin"></Login>
    <Kanban v-if="islogin"></Kanban>
  </div>
</template>

<script>
import Login from "./components/login.vue";
import Kanban from "./components/kanban.vue"
export default {
  components: {
    Login,
    Kanban
  },
  data() {
    return {islogin: localStorage.getItem('token') ? true : false
    }
  },
  methods:{
    changeislogin(nilaitoken){
      this.islogin = nilaitoken
    }
  }
};
</script>

<style scoped>
</style>