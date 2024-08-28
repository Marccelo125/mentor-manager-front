<script setup lang="ts">
import { logout } from '@/services/api'
import { ref } from 'vue'
import OverlayComponent from '@/components/OverlayComponent.vue'
import router from '../router/index'

const loading = ref<boolean>(false)

async function handleLogout() {
  loading.value = true
  await logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <OverlayComponent v-if="loading">
    <v-progress-circular :size="60" :width="8" color="white" indeterminate />
  </OverlayComponent>
  <header class="bg-white">
    <v-container fluid>
      <v-row class="d-flex align-center ga-2">
        <v-col class="d-flex justify-center justify-sm-start">
          <v-img
            class="mx-12"
            :max-width="120"
            src="https://www.growdev.com.br/assets/images/logo_growdev.png"
          ></v-img>
        </v-col>

        <v-col class="d-flex justify-center justify-sm-end">
          <v-btn color="red" class="text-capitalize" @click="handleLogout">Sair </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<style scoped>
.spinner-div {
  position: absolute;
  left: 46%;
  top: 50%;
}
</style>
