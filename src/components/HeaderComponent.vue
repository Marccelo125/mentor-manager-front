<template>
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
        <v-col
          cols="12"
          sm="6"
          lg="6"
          class="d-flex align-center justify-center justify-lg-end me-0 me-lg-10 ga-2"
        >
          <div>
            <span>Seja bem vindo!</span>
            <p class="font-weight-bold text-h6">Marcelo Duarte</p>
          </div>

          <div class="rounded-circle">
            <v-img
              :height="60"
              :width="60"
              rounded="circle"
              cover
              src="https://media.istockphoto.com/id/1059661424/photo/mature-mixed-race-business-man.jpg?s=612x612&w=0&k=20&c=UAVBeyoD_LkCh1MzVaWW1SR1iwK-VkPDXWMH2o2wL8M="
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>
