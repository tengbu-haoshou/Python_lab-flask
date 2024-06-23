<template>
  <v-app>
    <v-app-bar color="blue" app dark>
      <v-app-bar-title><h3 class="display-1">lab-flask</h3></v-app-bar-title>
      <v-btn id="logout" variant="outlined" color="white" @click="logout()" style="text-transform: none">Logout</v-btn>
    </v-app-bar>
    <v-footer color="blue" app dark>Copyright &copy; Xxxx Co., Ltd.</v-footer>
    <v-main>
      <v-container fluid>
        <v-row no-gutters>
          <v-col>{{message}}</v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="auto">
            <v-tabs>
              <v-tab id="home" style="text-transform: none" to="/FlaskHome"><h3 class="display-1">Home</h3></v-tab>
              <v-tab id="settings" style="text-transform: none" to="/FlaskSettings"><h3 class="display-1">Settings</h3></v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <div v-if="valid">
          <v-row>
            <v-col cols="auto">
              <v-data-table :headers="headers" :items="items"></v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

import axios from 'axios'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'

const router = useRouter()
const store = useStore()

const valid = ref(false)
const message = ref('')

const headers = [
  {
    title: 'Product Name',
    key: 'PRODUCT_NAME',
  },
  {
    title: 'Product Description',
    key: 'PRODUCT_DESC',
  },
]
const items = ref([])

axios.get("/info?type=settings")
.then (function(response) {
  if (response.data.status == 'action-ok') {
    items.value = response.data.list
    valid.value = true
  }
  else {
    message.value = response.data.message
  }
})
.catch (function() {
  message.value = 'Network trouble has occurred.'
})

function logout() {
  const formData = new FormData()
  axios.post('/unauth', formData)
  store.sessionId = ''
  router.push('/')
  return
}

</script>
