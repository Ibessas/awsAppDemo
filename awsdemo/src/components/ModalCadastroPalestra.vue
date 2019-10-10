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
                        Cadastro de Palestra
                    </v-card-title>
                </v-flex>
                <v-flex>
                    <v-card-text>
                        <v-text-field label="Nome da Palestra" v-model="palestra.title"></v-text-field>
                        <v-text-field label="Descrição" v-model="palestra.deion"></v-text-field>
                        <v-combobox v-model="nome"  :items="nomes" label="Palestrante"> </v-combobox>
                        <v-spacer></v-spacer>
                        <v-btn @click="toogleCadastroParticipante()">Cadastrar palestrante</v-btn>
                        <v-date-picker
                        v-model="palestra.date"
                        full-width
                        :landscape="$vuetify.breakpoint.smAndUp"
                        class="mt-4 mb-4"
                        ></v-date-picker>
                        <v-btn @click="cadastrar">Cadastrar</v-btn>
                    </v-card-text>
                </v-flex>
                <ModalCadastroPalestrante
                v-if="cadastroPalestrante"
                :visible="cadastroPalestrante"
                :toogleVisible="toogleCadastroParticipante"
                @palestrante="novoPalestrante"
                ></ModalCadastroPalestrante>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ModalCadastroPalestrante from './ModalCadastroPalestrante'
import store from './../store'
import axios from 'axios'
export default {
    components: {
        ModalCadastroPalestrante
    },
    name: "cadastroPalestra",
    props: {
    visible: Boolean,
    evento: String, 
    toogleVisible: Function, 
    reload: Function
},
    data: () => {
    return {
        nome:'',
        palestrantes:[],
        cadastroPalestrante: false,
        speaker:{},
        nomes:[],
        palestra:{}
    };
    },
    mounted() {
        document.addEventListener("keyup", this.keyboardEvent);
        this.getPalestrantes()
    },
  
    created(){

    },

    destroyed() {
        document.removeEventListener("keyup", this.keyboardEvent)
    },

    methods: {
        getPalestrantes(){
            axios.get(localStorage.getItem('urlBase')+'/speaker').then(res => {
                this.palestrantes = res.data.data
                this.palestrantes.forEach(r => {
                    this.nomes.push(r.name)
                })
            })
        },
        novoPalestrante(arg){
            this.speaker = arg
            this.speaker.name = arg.name
        },
        toogleCadastroParticipante(){
            this.cadastroPalestrante = !this.cadastroPalestrante
        },
        keyboardEvent(e){
            if(e.code == 'Escape')
                this.toogleVisible()
            if(e.code == 'Enter')
                this.cadastrar()
        },
        cadastrar(){
            this.palestrantes.forEach(r => {
                if(r.name == this.nome)
                    this.palestra.speaker_id = r._id
            })
            this.palestra.event_id = this.evento
            axios.post(localStorage.getItem('urlBase')+'/lecture',this.palestra).then( res => {
                this.reload()
                this.toogleVisible()
            })
        }
    }
};
</script>

<style>
</style>
