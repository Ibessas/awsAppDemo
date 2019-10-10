<template>
  <v-app>
    <v-app-bar app v-if="currentPage != 'login'">
      <v-toolbar-title class="headline">
        <span>MyLA</span>
        <span class="font-weight-light text-uppercase"> My Lecter Abstracter  </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="sair()"> sair </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import router from './router'

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    currentPage: ''
  }),
  created(){
    this.currentPage = router.history.current.name
  },
  methods: {
    sair(){
      localStorage.removeItem("user_id") 
      router.push('/login')
    }
  }
};
</script>
