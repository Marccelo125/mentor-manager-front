<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import MentorFormComponent from '@/components/MentorFormComponent.vue'
import MentorsTableComponent from '@/components/MentorsTableComponent.vue'
import type { MentorType } from '@/types/MentorType'
import { computed, onMounted, ref } from 'vue'
import { doGet } from '@/services/api'

const search = ref<string>('')
const mentorsAll = ref<MentorType[]>([])
const mentors = ref<MentorType[]>([])
const spinnerLoading = ref<boolean>(false)

async function fetchMentors() {
  spinnerLoading.value = true

  const response = await doGet('/mentors')

  if (response) {
    mentors.value = response
    mentorsAll.value = response
  }

  spinnerLoading.value = false
}

async function fetchQuery() {
  if (search.value.length === 0) {
    mentors.value = mentorsAll.value
    return
  }
  spinnerLoading.value = true

  mentors.value = computed(() => {
    const query = search.value.toLowerCase()
    return mentors.value.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(query) ||
        mentor.cpf.includes(query) ||
        mentor.email.toLowerCase().includes(query)
    )
  }).value
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
            variant="solo"
            hide-details
            single-line
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
