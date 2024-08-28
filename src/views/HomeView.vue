<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import MentorFormComponent from '@/components/MentorFormComponent.vue'
import MentorsTableComponent from '@/components/MentorsTableComponent.vue'

import { ref } from 'vue'

const search = ref<string>('')
</script>

<template>
  <HeaderComponent />

  <main>
    <v-container>
      <v-row class="d-flex align-center justify-space-evenly">
        <v-col cols="12" sm="6" md="8" lg="9" class="mx-0">
          <v-text-field
            v-model="search"
            label="Pesquisar"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-col>
        <MentorFormComponent />
        <MentorsTableComponent />
      </v-row>
    </v-container>
  </main>
</template>
