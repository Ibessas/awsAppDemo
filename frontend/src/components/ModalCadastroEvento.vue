<template>
    <div class="text-xs-right">
        <v-dialog
        v-model="visible"
        persistent
        transition="dialog-bottom-transition"
        >
            <v-card>
                <v-flex>
                    <v-card-title>
                        Cadastro de Reunião
                    </v-card-title>
                </v-flex>
                <v-flex xs-8>
                    <v-card-text>
                        <v-text-field label="Nome do Evento" v-model="evento.name"></v-text-field>
                        <v-text-field label="Descrição" v-model="evento.description"></v-text-field>
                        <v-card>
                            <v-card-text>
                                <v-autocomplete label="Pais" :items="paises()" v-model="evento.location.country"></v-autocomplete>
                                <v-autocomplete label="Estado" :items="estados()" v-model="evento.location.state"></v-autocomplete>
                                <v-autocomplete label="Cidade" :items="cidades()" v-model="evento.location.city"></v-autocomplete>
                                <v-text-field label="Endereço" v-model="evento.location.address"></v-text-field>
                            </v-card-text>
                        </v-card>
                        <v-flex mt-2>
                            <v-btn @click="cadastrar">Cadastrar</v-btn>
                        </v-flex>
                    </v-card-text>
                </v-flex>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import store from './../store'
import axios from 'axios'
import jsonEstados from './../assets/estados_cidades.json'
import jsonPaises from './../assets/paises.json'

export default {
name: "cadastroReuniao",
props: {
visible: Boolean,
toogleVisible: Function, 
reload: Function
},
    data: () => {
    return {
        lugares: [],
        pais: [],
        evento: {
            name: '',
            description: '',
            location: {},
            palestras:[]
        }
    };
    },

    mounted() {
        this.lugares = jsonEstados.estados
        this.pais = jsonPaises
        document.addEventListener("keyup", this.keyboardEvent);
    },
  
    created(){

    },

    destroyed() {
        document.removeEventListener("keyup", this.keyboardEvent)
    },

    methods: {
        paises(){
            var aux = []
                this.pais.forEach(e => {
                    aux.push(e.nome_pais)
                });
            return aux
        },
        estados(){
            var aux = []
            if(this.evento.location.country == "Brasil")
                this.lugares.forEach(e => {
                    aux.push(e.nome)
                });
            return aux
        },
        cidades(){
            var aux = []
            if(this.evento.location.country == "Brasil"){
                this.lugares.forEach(e => {
                    if(e.nome == this.evento.location.state)
                        aux = e.cidades
                });
            }
            return aux
        },
        keyboardEvent(e){
            if(e.code == 'Escape')
                this.toogleVisible()
            if(e.code == 'Enter')
                this.cadastrar()
        },
        cadastrar(){
            if(this.evento.location.city == null || this.evento.location.state == null ||
            this.evento.location.country == null || this.evento.location.address == null)
                return
            this.evento.user = localStorage.getItem('user_id')
            axios.post(localStorage.getItem('urlBase')+'/event',this.evento).then( res =>{
                this.reload()
                this.toogleVisible()
            })
        }
    }
};
</script>

<style>
</style>
