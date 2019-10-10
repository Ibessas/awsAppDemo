<template>
  <v-flex ma-5>
    <v-card>
      <v-card-title>
        <h2>{{palestra.title}}</h2>
        <v-chip class="ml-2" :text-color="status.textColor" :color="status.color">{{status.text}}</v-chip>
        <v-spacer></v-spacer>
        <v-btn to="/dashboard" text>Voltar</v-btn>
      </v-card-title>
      <v-card-text>
        <v-flex ma-5>
          <audio controls>
            <!-- <source src="palestra.file_id.url" type="audio/mpeg"> -->
            Your browser does not support the audio element.
          </audio>
          <v-card>
            <v-card-text> </v-card-text>
          </v-card>
          <input type="file" name="resume" @change="uploadResume" class="form-control-file"> 
          <p style="text-color:green"  v-if="loading"> Carregando... </p> 
          <p v-if="transcrevendo"> Transcrevendo... </p>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>

import axios from 'axios'
import fs from 'fs'
import router from './../router'
import wavEncoder from 'wav-encoder'

export default {
  components: {
  },
  name:"palestra",
  data:  () => {
    return {
        status:{},
        loading: false,
        transcrevendo: false,
        concluido: false,
        palestra: {},
    }
  },
  mounted(){

  },
  created() {
    this.loadPalestra()
  },
  methods: {
    loadPalestra(){
    axios.get(localStorage.getItem('urlBase')+'/lecture/'+router.history.current.params.id).then( res => {
      this.palestra = res.data.data
      if(this.palestra.fileId != null){
        this.loading = false
        if(this.palestra.transcription_id != null)
          this.transcrevendo = false
        else
          this.transcrevendo = true
      }
      else 
        this.loading = true
    })
    
    },
    uploadResume(e) {
      let formData = new FormData();
      let reader = new FileReader();
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
      return;
              }
      // Read contents of file that's stored on user's computers
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
      reader.onload = (e) => {
        this.file = e.target.result;
        // Prepare form data to be sent via AJAX
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData
        formData.append('lecture_id', this.palestra._id);
        formData.append('baseAudio', files[0]);
        // console.log(files[0])
        // console.log(this.file)

        // const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        //   const byteCharacters = btoa(b64Data);
        //   const byteArrays = [];

        //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        //     const slice = byteCharacters.slice(offset, offset + sliceSize);

        //     const byteNumbers = new Array(slice.length);
        //     for (let i = 0; i < slice.length; i++) {
        //       byteNumbers[i] = slice.charCodeAt(i);
        //     }

        //     const byteArray = new Uint8Array(byteNumbers);
        //     byteArrays.push(byteArray);
        //   }

        //   const blob = new Blob(byteArrays, {type: contentType});
        //   return blob;
        // }
        // // console.log(btoa(this.file))
        // var blob = b64toBlob(this.file, 'audio');
        var aux = {
          lecture_id: this.palestra._id,
          baseAudio: this.file
        }

        // var httpRequestOptions = {
          //   method: 'POST',
        //   body: formData , // with our form data packaged above
        //   headers: new Headers({
          //     'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        //   })
        // };
      //   httpDo(
        //   'http://117f47c3.ngrok.io/file/',
      //   httpRequestOptions,
      //   (successStatusCode)=>{ //if we were successful...
      //     console.log("uploaded recording successfully: " + successStatusCode)
      //   },
      //   (error)=>{console.error(error);}
      // )

        // Async request to upload resume from Laravel backend
        console.log(this.file)
        this.loading = true
        axios.post(localStorage.getItem('urlBase')+`/file/`, aux).then(req => {
          this.loading=false
        })

        
      };
      // Read contents of the file
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
      reader.readAsDataURL(files[0]);
    }
  }
};
</script>
  