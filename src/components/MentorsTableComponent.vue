<script setup lang="ts">
import type { MentorType } from '@/types/MentorType'
import { deleteMentor, editMentor } from '@/services/api'
import { ref } from 'vue'

const loading = ref<boolean>(false)

const deleteDialog = ref<Record<number, boolean>>({})
const editDialogForm = ref<Record<number, boolean>>({})

const editName = ref<string>('')
const editEmail = ref<string>('')
const editCpf = ref<string>('')

async function handleEditMentor(id: number) {
  try {
    await editMentor(id, editName?.value, editEmail?.value, editCpf?.value)

    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

async function handleDeleteMentor(id: number) {
  try {
    const response = await deleteMentor(id)
    console.log('deletando...')

    if (response) {
      window.location.reload()
    }
  } catch (error) {
    console.log(error)
  }
}

defineProps<{
  mentors: MentorType[]
}>()
</script>

<script lang="ts">
export default {
  data: () => ({
    editName: '',
    editEmail: '',
    editCpf: '',
    rules: {
      email: (value: string) => {
        const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
        return pattern.test(value) || 'E-mail inválido'
      },
      min: (value: string) => value.length >= 4 || 'Valor inserido é muito curto.',
      max: (value: string) => value.length <= 60 || 'Valor inserido é muito longo.'
    }
  }),
  return: {
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  }
}
</script>

<template>
  <v-col cols="12" class="bg-white rounded-lg mt-2 mx-3">
    <v-table min-height="2vh">
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Email</th>
          <th class="text-left">CPF</th>
          <th class="text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mentor in mentors" :key="mentor.id">
          <td>{{ mentor.name }}</td>
          <td>{{ mentor.email }}</td>
          <td>{{ mentor.cpf }}</td>
          <td>
            <button
              class="bg-yellow-accent-3 pa-2 rounded font-weight-medium"
              @click="editDialogForm[mentor.id] = true"
            >
              <v-icon icon="mdi mdi-pencil-box" color="dark" size="medium"></v-icon>
              Editar
            </button>
            <button
              class="bg-red-darken-3 ma-2 pa-2 rounded font-weight-medium"
              @click="deleteDialog[mentor.id] = true"
            >
              <v-icon icon="mdi mdi-delete" color="white" size="medium"></v-icon>
              Remover
            </button>
          </td>

          <!-- EDIT MODAL -->
          <div class="text-center pa-4">
            <v-dialog v-model="editDialogForm[mentor.id]" max-width="500">
              <v-card title="Editar mentor">
                <v-card-text>
                  <v-form ref="form">
                    <div class="text-subtitle-1 text-medium-emphasis">Nome</div>

                    <v-text-field
                      v-model="editName"
                      :value="mentor.name"
                      :rules="[rules.min, rules.max]"
                      class="mb-3"
                    ></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                    <v-text-field
                      v-model="editEmail"
                      :value="mentor.email"
                      type="email"
                      :rules="[rules.email]"
                      class="mb-3"
                    ></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">CPF</div>

                    <v-text-field
                      v-model="editCpf"
                      :value="mentor.cpf"
                      v-mask="['###.###.###-##']"
                      class="mb-3"
                    ></v-text-field>

                    <div class="d-flex justify-center flex-column ga-2">
                      <v-btn
                        v-if="!loading"
                        color="yellow-darken-1"
                        @click="handleEditMentor(mentor.id)"
                        variant="flat"
                      >
                        Editar
                      </v-btn>

                      <v-btn v-if="loading" color="blue-lighten-1" variant="flat"
                        ><v-progress-circular :size="20" :width="4" color="white" indeterminate
                      /></v-btn>

                      <v-btn
                        text="Cancelar"
                        @click="editDialogForm[mentor.id] = false"
                        variant="flat"
                      ></v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
          <!-- CONFIRM TO DELETE MODAL -->
          <div class="text-center pa-4">
            <v-dialog v-model="deleteDialog[mentor.id]" persistent max-width="500">
              <v-card>
                <v-toolbar>
                  <v-card-title>
                    <h2>Tem certeza disso?</h2>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn icon="mdi-close" @click="deleteDialog[mentor.id] = false"></v-btn>
                </v-toolbar>

                <v-card-text>
                  <p class="font-weight-medium">
                    Ao confirmar este mentor será excluído
                    <span class="text-red font-weight-bold">permanentemente</span> do sistema
                  </p>
                </v-card-text>

                <v-divider></v-divider>

                <div class="d-flex justify-end">
                  <v-btn
                    class="ma-2"
                    text="Cancelar"
                    @click="deleteDialog[mentor.id] = false"
                    variant="flat"
                  ></v-btn>
                  <v-btn
                    v-if="!loading"
                    class="ma-2"
                    color="red-lighten-1"
                    @click="handleDeleteMentor(mentor.id)"
                    variant="flat"
                    >Deletar</v-btn
                  >

                  <v-btn v-if="loading" color="red-lighten-1 ma-2" variant="flat"
                    ><v-progress-circular :size="20" :width="4" color="white" indeterminate
                  /></v-btn>
                </div>
              </v-card>
            </v-dialog>
          </div>
        </tr>
      </tbody>
    </v-table>
  </v-col>
</template>
