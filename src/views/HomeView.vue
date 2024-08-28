<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import MentorFormComponent from '@/components/MentorFormComponent.vue'
import MentorsTableComponent from '@/components/MentorsTableComponent.vue'
import { doGet, doGetQuery } from '@/services/api'
import type { MentorType } from '@/types/MentorType'

import { onMounted, ref } from 'vue'

const search = ref<string>('')
const mentors = ref<MentorType[]>([])

const spinnerLoading = ref<boolean>(false)

async function fetchMentors() {
  spinnerLoading.value = true

  const response = await doGet('/mentors')

  if (response) {
    mentors.value = response
  }

  spinnerLoading.value = false
}

async function fetchQuery(query: string) {
  spinnerLoading.value = true

  const response = await doGetQuery(query)

  if (response) {
    mentors.value = response
  }
  spinnerLoading.value = false
}
onMounted(() => {
  fetchMentors()
})
</script>

<template>
  <HeaderComponent />
  <main>
    <v-container>
      <v-row class="d-flex align-center justify-space-evenly">
        <v-col cols="12" sm="6" md="8" lg="9" class="mx-0">
          <v-text-field
            v-model="search"
            @update:model-value="fetchQuery(search)"
            placeholder="Pesquise por um mentor..."
            prepend-inner-icon="mdi-magnify"
            label="Pesquisar"
            variant="solo"
            hide-details
            single-line
            clearable
            flat
          ></v-text-field>
        </v-col>
        <MentorFormComponent />
        <v-progress-circular
          v-if="spinnerLoading"
          :size="60"
          :width="8"
          color="blue"
          indeterminate
        />

        <MentorsTableComponent v-if="!spinnerLoading" :mentors="mentors" />
      </v-row>
    </v-container>
  </main>
</template>
