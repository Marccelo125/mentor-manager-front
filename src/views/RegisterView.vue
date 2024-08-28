<script setup lang="ts">
import FormColComponent from '@/components/FormColComponent.vue'

async function handleSubmitForm() {}
</script>

<script lang="ts">
export default {
  data: () => ({
    visible: false
  })
}
</script>

<template>
  <v-container class="d-flex justify-center align-items-center my-12" style="min-height: 80vh">
    <v-row class="bg-blue-lighten-5 rounded-xl">
      <v-col class="col-12 col-md-6">
        <div class="pa-12">
          <h1 class="text-blue-darken-1">Bem-vindo ao Mentors!</h1>
          <form @submit.prevent="handleSubmitForm">
            <div class="text-subtitle-1 text-medium-emphasis">Email</div>

            <v-text-field
              density="compact"
              placeholder="Insira seu email"
              variant="outlined"
            ></v-text-field>

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Senha
            </div>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Insira sua senha"
              variant="outlined"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Repita sua senha
            </div>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Insira sua senha novamente"
              variant="outlined"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-btn class="mb-8 bg-blue-darken-1" color="white" size="large" variant="tonal" block>
              Cadastre-se
            </v-btn>

            <v-card-text class="text-center">
              <a class="text-blue text-decoration-none" href="/login" rel="noopener noreferrer">
                Ja tem uma conta? <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>
          </form>
        </div>
      </v-col>
      <FormColComponent />
    </v-row>
  </v-container>
</template>
