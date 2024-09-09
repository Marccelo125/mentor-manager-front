<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import MentorFormComponent from '@/components/MentorFormComponent.vue'
import MentorsTableComponent from '@/components/MentorsTableComponent.vue'
import { computed, ref } from 'vue'
import type { PaginationType } from '@/types/PaginationType'

const search = ref<string>('')
const mentorsAll = ref<PaginationType>()
const mentors = ref<PaginationType>()
const spinnerLoading = ref<boolean>(false)

async function fetchQuery() {
  if (search.value.length === 0) {
    mentors.value = mentorsAll.value
    return
  }
  spinnerLoading.value = true

  if (mentors.value)
    () =>
      computed(() => {
        const query = search.value.toLowerCase()
        return mentors.value?.data?.filter(
          (mentor) =>
            mentor.name.toLowerCase().includes(query) ||
            mentor.cpf.includes(query) ||
            mentor.email.toLowerCase().includes(query)
        )
      }).value
  spinnerLoading.value = false
}
</script>

<template>
  <HeaderComponent />
  <main>
    <v-container>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="12" md="6" lg="8">
          <v-text-field
            v-model="search"
            @update:model-value="fetchQuery()"
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
      </v-row>
      <MentorsTableComponent v-if="!spinnerLoading" :mentors="mentors" />
    </v-container>
  </main>
</template>
