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
                        Cadastro de Palestrante
                    </v-card-title>
                </v-flex>
                <v-flex>
                    <v-card-text>
                        <v-text-field label="Nome" v-model="palestrante.name"></v-text-field>
                        <v-text-field label="Profissão" v-model="palestrante.profession"></v-text-field>
                        <v-text-field label="Email" v-model="palestrante.email"></v-text-field>
                        <v-text-field label="Telefone" v-model="palestrante.phone"></v-text-field>
                        <!-- <v-text-field label="Informações adicionais" v-model="palestra.additional_info"></v-text-field> -->
                        <v-textarea
                        label="Informação adicional"
                        v-model="palestrante.additional_info"
                        ></v-textarea>
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
name: "cadastroPalestrante",
props: {
visible: Boolean,
toogleVisible: Function
},
    data: () => {
    return {
        palestrante:{
        }
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
            axios.post(localStorage.getItem('urlBase')+'/speaker',this.palestrante).then( res => {
                this.$emit('palestrante',res.data.data)
                this.toogleVisible()
            })
            
        }
    }
};
</script>

<style>
</style>
