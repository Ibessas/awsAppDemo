<template>
  <v-flex ma-5>

    <v-btn class="mb-2" @click="toogleCadastrarEvento">Cadastrar Evento</v-btn>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="evento in eventos"
        :key="evento._id"
      >
        <v-expansion-panel-header>
          <h2>{{evento.name}}</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-flex>
            <p>Local: {{evento.location.address}} - {{evento.location.city}} - {{evento.location.state}} - {{evento.location.country}} </p>
            <p>Descrição: {{evento.description}} </p>
            <v-spacer></v-spacer>
            <v-btn @click="toogleCadastrarPalestra(evento)" class="mr-2" text> Adicionar palestras </v-btn>
            <v-btn @click="toogleVerPalestras(evento._id)" text> Ver palestras </v-btn>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <ModalCadastroEvento
    v-if="cadastrarEvento"
    :visible="cadastrarEvento"
    :toogleVisible="toogleCadastrarEvento"
    :reload="loadTable"
    ></ModalCadastroEvento>

    <ModalCadastroPalestra
    v-if="cadastrarPalestra"
    :visible="cadastrarPalestra"
    :toogleVisible="toogleCadastrarPalestra"
    :reload="loadTable"
    :evento="eventoId"
    ></ModalCadastroPalestra>

    <ModalVerPalestras
    v-if="verPalestras"
    :visible="verPalestras"
    :toogleVisible="toogleVerPalestras"
    :palestras="itemsPalestras"
    ></ModalVerPalestras>

  </v-flex>
</template>

<script>

import ModalCadastroEvento from "./../components/ModalCadastroEvento"
import ModalCadastroPalestra from "./../components/ModalCadastroPalestra"
import ModalVerPalestras from "./../components/ModalVerPalestras"
import store from './../store'
import router from './../router'
import axios from 'axios'

export default {
  components: {
    ModalCadastroEvento,
    ModalCadastroPalestra,
    ModalVerPalestras
  },
  name:"dashboard",
  data:  () => {
    return {
      aux:[],
      eventoId: '',
      expanded: [],
      expand: false,
      cadastrarEvento: false,
      cadastrarPalestra: false,
      verPalestras:  false,
      itemsPalestras: [],
      eventos: [],
      headers:[
        {text:"Nome", value:"name"},{text:"Actions",value:"actions"}
      ]
    }
  },
  created() {
    this.loadTable()
  },
  methods: {
    colunizar(item){
      var itens = item.palestras
      let columns = []
      let mid = Math.ceil(itens.length / 2)
      for (let col = 0; col < 2; col++) {
        columns.push(itens.slice(col * mid, col * mid + mid))
      }
      return columns
    },
    toogleCadastrarEvento() {
        this.cadastrarEvento = !this.cadastrarEvento
    },
    toogleVerPalestras(evento) {
        if(evento!=null)
          this.loadPalestras(evento)
        this.verPalestras = !this.verPalestras
    },
    toogleCadastrarPalestra(item) {
      if(item != null)
        this.eventoId = item._id
      this.cadastrarPalestra = !this.cadastrarPalestra
    },
    loadTable(){
      axios.get(localStorage.getItem('urlBase')+'/event/user/'+localStorage.getItem('user_id')).then( res => {
        this.eventos = res.data.data
      })
    },
    async loadPalestras(item){
       await axios.get(localStorage.getItem('urlBase')+'/lecture/event/'+item)
       .then(res => {
        this.itemsPalestras = res.data.data
      })
    }
  }
};  
</script>
  