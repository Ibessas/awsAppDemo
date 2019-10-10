<template>
    <v-app id="login">
    <v-content>
      <v-container
        class="fill-height"
        fluid
        id="background"
      >
        <v-row
          align="center"
          justify="center"
        > 
          <v-col
          cols="8"
            sm="8"
            md="4">
            <h1 id="title">MyLA</h1>
            <span id="subTitle">My Lecter Abstracter é um sistema que disponibiliza conteúdo das suas palestras em qualquer lugar</span>
          </v-col>
          <v-col
            cols="8"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    v-model="usuario.email"
                    prepend-icon="person"
                    type="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Senha"
                    name="senha"
                    v-model="usuario.senha"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="logar()">Login</v-btn>
                <v-btn color="primary" @click="tooglecadastrarUsuario()">Cadastro</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    <ModalCadastroUsuario
    v-if="cadastrarUsuario"
    :visible="cadastrarUsuario"
    :toogleVisible="tooglecadastrarUsuario"
    :reload="reloadTable"
    ></ModalCadastroUsuario>
    </v-content>
    </v-app>
</template>

<script>
import ModalCadastroUsuario from './../components/ModalCadastroUsuario'
import router from './../router'
import axios from 'axios'

  export default {
    components: {
        ModalCadastroUsuario
    },
    props: {
      source: String,
    },
    data: () => ({
        cadastrarUsuario: false,
        usuario:{}
    }),
    mounted() {
        document.addEventListener("keyup", this.keyboardEvent);
    },
  
    created(){

    },

    destroyed() {
        document.removeEventListener("keyup", this.keyboardEvent)
    },
    methods: {
      keyboardEvent(e){
        if(e.key=="Enter")
          this.logar()
      },
      logar(){
          localStorage.setItem("urlBase",'http://3.16.109.167:3000')
          localStorage.setItem("appName",'DEMO-AWS')
          axios.put(localStorage.getItem('urlBase')+'/user',this.usuario).then(res => {
            if(res.status == 200){
              localStorage.setItem("user_id", res.data.data._id) 
              router.push('/dashboard')
            }
          })
        },
        tooglecadastrarUsuario(){
            this.cadastrarUsuario = !this.cadastrarUsuario
        }
    }
  }
</script>
<style scoped>
#background{
  background-color: black;
  background-image: url('./../img/login-background2.jpg');
  background-size:  100% 100%;
}
#title{
  font-size: 50px;
  color: white;
}
#subTitle{
  color: white;
}
</style>