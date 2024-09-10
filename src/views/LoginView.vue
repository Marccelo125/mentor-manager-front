<script setup lang="ts">
import FormColComponent from '@/components/FormColComponent.vue'
import OverlayComponent from '@/components/OverlayComponent.vue'
import { login } from '@/services/api'
import { ref } from 'vue'
import router from '../router/index'

const email = ref<string>('')
const password = ref<string>('')

const loading = ref<boolean>(false)

async function handleSubmitForm(email: string, password: string) {
  loading.value = true
  try {
    const response = await login(email, password)
    if (response) {
      router.push({ name: 'home' })
    }
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
</script>

<script lang="ts">
export default {
  data: () => ({
    visible: false,
    rules: {
      required: (value: string) => !!value || 'Campo obrigatório',
      email: (value: string) => {
        const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
        return pattern.test(value) || 'E-mail inválido'
      },
      min: (value: string) => value.length >= 4 || 'Valor inserido é muito curto.',
      max: (value: string) => value.length <= 60 || 'Valor inserido é muito longo.'
    }
  })
}
</script>

<template>
  <OverlayComponent v-if="loading">
    <v-progress-circular :size="60" :width="8" color="white" indeterminate />
  </OverlayComponent>
  <v-container class="d-flex justify-center mt-12" style="min-height: 80vh">
    <v-row class="bg-blue-lighten-5 rounded-xl">
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <div class="d-flex flex-column w-75">
          <h1 class="text-blue-darken-1 font-weight-bold text-h3">Bem-vindo de volta!</h1>
          <form @submit.prevent="handleSubmitForm(email, password)">
            <div class="text-subtitle-1 text-medium-emphasis">Email</div>

            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              density="compact"
              placeholder="Insira seu email"
              variant="outlined"
            ></v-text-field>

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              Senha

              <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                Esqueceu sua senha?</a
              >
            </div>

            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.min, rules.max]"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Insira sua senha"
              variant="outlined"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-btn
              type="submit"
              class="mb-8 bg-blue-darken-1"
              color="white"
              size="large"
              variant="tonal"
              block
            >
              Entrar
            </v-btn>

            <v-card-text class="text-center">
              <a class="text-blue text-decoration-none" href="/register" rel="noopener noreferrer">
                Cadastre-se agora <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>
          </form>
        </div>
      </v-col>
      <FormColComponent />
    </v-row>
  </v-container>
</template>
