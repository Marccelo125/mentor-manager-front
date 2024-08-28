<script setup lang="ts">
import FormColComponent from '@/components/FormColComponent.vue'
import OverlayComponent from '@/components/OverlayComponent.vue'
import { doRegister } from '@/services/api'
import { ref } from 'vue'
import router from '../router/index'

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

const loading = ref<boolean>(false)

async function handleSubmitForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  loading.value = true
  try {
    if (confirmPassword !== password) {
      loading.value = false
      alert('As senhas devem ser iguais')
    }

    const response = await doRegister(name, email, password)
    console.log(response)

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
    otherVisible: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rules: {
      required: (value: string) => !!value || 'Campo obrigatório',
      email: (value: string) => {
        const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
        return pattern.test(value) || 'E-mail inválido'
      },
      min: (value: string) => value.length >= 4 || 'Valor inserido é muito curto.',
      max: (value: string) => value.length <= 60 || 'Valor inserido é muito longo.',
      minPassword: (value: string) =>
        value.length >= 8 || 'A senha deve ter pelo menos 8 caracteres.',
      maxPassword: (value: string) =>
        value.length <= 60 || 'A senha deve ter no maximo 60 caracteres.'
    }
  })
}
</script>

<template>
  <OverlayComponent v-if="loading">
    <v-progress-circular :size="60" :width="8" color="white" indeterminate />
  </OverlayComponent>
  <v-container class="d-flex justify-center align-items-center my-12" style="min-height: 80vh">
    <v-row class="bg-blue-lighten-5 rounded-xl">
      <v-col class="col-12 col-md-6">
        <div class="pa-12">
          <h1 class="text-blue-darken-1">Bem-vindo ao Mentors!</h1>
          <form @submit.prevent="handleSubmitForm(name, email, password, confirmPassword)">
            <div class="text-subtitle-1 text-medium-emphasis">Nome</div>

            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.min, rules.max]"
              density="compact"
              placeholder="Insira seu nome"
              variant="outlined"
            ></v-text-field>

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
            </div>

            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.minPassword, rules.maxPassword]"
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
              v-model="confirmPassword"
              :rules="[rules.required, rules.minPassword, rules.maxPassword]"
              :append-inner-icon="otherVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="otherVisible ? 'text' : 'password'"
              density="compact"
              placeholder="Insira sua senha"
              variant="outlined"
              @click:append-inner="otherVisible = !otherVisible"
            ></v-text-field>

            <v-btn
              type="submit"
              class="mb-8 bg-blue-darken-1"
              color="white"
              size="large"
              variant="tonal"
              block
            >
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
