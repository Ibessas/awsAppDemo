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
            <v-btn @click="toogleVerPalestras(evento.palestras)" text> Ver palestras </v-btn>
          </v-flex>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
   <!-- <v-data-table
      :headers="headers"
      :items="eventos"
      item-key="name"
      :expand="expand"
    >
      <template v-slot:item="props">
        <tr @click="props.expanded = !props.expanded">
          <td>
            <p>{{props.item.name}} </p>
          </td>
        <td>
          <v-icon
              small
              class="mr-2"
              @click="toogleCadastrarPalestra(item)">
              add
            </v-icon>
          </td>
        </tr>
    </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>Peek-a-boo!</v-card-text>
        </v-card>
      </template>
    </v-data-table> -->
    
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
      console.log(item)
      console.log(itens)
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
    toogleVerPalestras(items) {
        if(items!=null)
          this.itemsPalestras = items
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
        this.eventos.forEach(e => {
          this.loadPalestras(e)
        });
      })
    },
    loadPalestras(item){
      axios.get(localStorage.getItem('urlBase')+'/lecture/event/'+item._id).then(res => {
        this.eventos.forEach(e => {
          try {
            if(res.data.data[0] != null)
              if(res.data.data[0].event_id){
                e.palestras = res.data.data
              }
          } catch (error) {
            console.log(error)
          }
        });
      }) 
    }
  }
};  
</script>
  