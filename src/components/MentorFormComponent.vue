<script setup lang="ts">
import { newMentor } from '@/services/api'
import { ref } from 'vue'

const name = ref<string>('')
const email = ref<string>('')
const cpf = ref<string>('')

const dialogForm = ref<boolean>(false)

const loading = ref<boolean>(false)

async function handleSubmitForm() {
  try {
    loading.value = true

    await newMentor(name.value, email.value, cpf.value)

    window.location.reload()

    loading.value = false
    dialogForm.value = false

    return true
  } catch {
    alert('Não foi possível cadastrar o mentor!')
    loading.value = false

    return false
  }
}
</script>

<script lang="ts">
export default {
  data: () => ({
    name: '',
    email: '',
    cpf: '',
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
  <v-col cols="12" sm="6" md="4" lg="3" class="d-flex justify-center mx-0">
    <v-dialog v-model="dialogForm" max-width="450">
      <template v-slot:activator="{ props: activatorNewMentor }">
        <v-btn
          v-bind="activatorNewMentor"
          class="d-flex align-center justify-center rounded-lg pa-6"
          color="blue-lighten-1"
          text="Cadastrar mentor"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Novo mentor">
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="name"
                label="Nome"
                :rules="[rules.required, rules.min, rules.max]"
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="E-mail"
                type="email"
                :rules="[rules.required, rules.email]"
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="cpf"
                label="CPF"
                :rules="[rules.required]"
                v-mask="['###.###.###-##']"
                class="mb-3"
              ></v-text-field>

              <div class="d-flex justify-center flex-column ga-2">
                <v-btn
                  v-if="!loading"
                  color="blue-lighten-1"
                  @click="handleSubmitForm"
                  variant="flat"
                  >Salvar</v-btn
                >

                <v-btn v-if="loading" color="blue-lighten-1" variant="flat"
                  ><v-progress-circular :size="20" :width="4" color="white" indeterminate
                /></v-btn>

                <v-btn text="Cancelar" @click="isActive.value = false" variant="flat"></v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>
