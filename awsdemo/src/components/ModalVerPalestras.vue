<template>
    <div class="text-xs-right">
        <v-dialog
        v-model="visible"
        persistent
        transition="dialog-bottom-transition"
        >
            <v-card v-for="palestra in palestras" v-bind:key="palestra._id">
                <v-flex mt-2>
                    <v-card-title>
                        {{palestra.title}}
                    </v-card-title>
                    <v-card-text>
                        <p>Status:  {{palestra.status}}</p>
                        <p>Palestrante: {{palestra.speaker_id.name}} </p>
                        <v-btn @click="redirect(palestra._id)">Ver</v-btn>
                    </v-card-text>
                </v-flex>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import store from './../store'
import axios from 'axios'
import router from "./../router"
export default {
name: "cadastroReuniao",
props: {
visible: Boolean,
toogleVisible: Function,
palestras: Array
},
    data: () => {
    return {
        palestrantes:[]
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
        redirect(id){
            router.push('/palestra/'+id)
        },
        keyboardEvent(e){
            if(e.key == "Escape")
                this.toogleVisible()
        }
    }
};
</script>

<style>
</style>
