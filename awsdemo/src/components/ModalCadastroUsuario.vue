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
                        Cadastrar usuario
                    </v-card-title>
                </v-flex>
                <v-flex>
                    <v-card-text>
                        <v-text-field label="Nome" v-model="usuario.name"></v-text-field>
                        <v-text-field label="Email" v-model="usuario.email"></v-text-field>
                        <v-text-field label="Senha"  v-model="senha"></v-text-field>
                        <v-text-field label="Repetir senha"  v-model="senhaConfirm"></v-text-field>
                        <v-btn @click="cadastrar">Cadastrar</v-btn>
                    </v-card-text>
                </v-flex>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import store from './../store'
import axios from 'axios'
export default {
name: "cadastroReuniao",
props: {
visible: Boolean,
evento: String, 
toogleVisible: Function, 
reload: Function
},
    data: () => {
    return {
        senha:'',
        senhaConfirm:'',
        usuario:{}
    };
    },

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
            if(e.code == 'Escape')
                this.toogleVisible()
            if(e.code == 'Enter')
                this.cadastrar()
        },
        cadastrar(){
            if(this.senha === this.senhaConfirm){
                this.usuario.senha = this.senha
                axios.post(localStorage.getItem('urlBase')+'/user', this.usuario).then(res => {
                    this.toogleVisible()
                })
            }
        }
    }
};
</script>

<style>
</style>
