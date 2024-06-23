<template>
  <v-app>
    <v-app-bar color="blue" app dark>
      <v-toolbar-title><h3 class="display-1">lab-flask</h3></v-toolbar-title>
    </v-app-bar>
    <v-footer color="blue" app dark>Copyright &copy; Xxxx Co., Ltd.</v-footer>
    <v-main>
      <v-container fluid>
        <v-row no-gutters>
          <v-col><h3 class="display-1">Login</h3></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>{{ message }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-form>
              <v-text-field id="userName" autocomplete="off" prepend-icon="mdi-account" clearable label="User Name" v-model="userName" />
              <v-text-field id="password"
                autocomplete="off" prepend-icon="mdi-lock" clearable label="Password" v-model="password"
                v-bind:type="showPassword ? 'text' : 'password'"
                v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = ! showPassword" />
              <v-btn id="login" variant="outlined" color="success" @click="login" style="text-transform: none">Login</v-btn>
            </v-form>
          </v-col>
        </v-row>
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

const message = ref('')
const showPassword = ref(false)
const userName = ref('')
const password = ref('')

if (store.sessionId != '') {
  const formData = new FormData()
  axios.post('/unauth', formData)
  store.sessionId = ''
}

function login() {
  if (! userName.value) {
    message.value = 'User Name is required.'
    return  
  }
  if (! password.value) {
    message.value = 'Password is required.'
    return
  }
  const formData = new FormData()
  formData.append('user_name', userName.value)
  formData.append('password', password.value)
  axios.post('/auth', formData)
  .then (function(response) {
    if (response.data.status == 'action-ok') {
      store.sessionId = "in session"
      router.push('/FlaskHome')
      return
    }
    else {
      message.value = response.data.message
      return
    }
  })
  .catch (function(error) {
    message.value = 'Network trouble has occurred.'
    return
  })
}

</script>
