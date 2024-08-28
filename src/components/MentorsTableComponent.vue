<template>
  <v-col cols="12" class="bg-white rounded-lg mt-2 mx-3">
    <v-table height="300px">
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Email</th>
          <th class="text-left">CPF</th>
          <th class="text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Marcelo Duarte</td>
          <td>contato.marccelo125@gmail.com</td>
          <td>123.123.123-00</td>
          <td class="d-flex flex-row justify-left ga-4">
            <button class="bg-yellow-accent-3 my-2 px-2 rounded font-weight-medium">
              <v-icon icon="mdi mdi-pencil-box" color="dark" size="medium"></v-icon>
              Editar
            </button>
            <button class="bg-red-darken-3 my-2 px-2 rounded font-weight-medium">
              <v-icon icon="mdi mdi-delete" color="white" size="medium"></v-icon>
              Remover
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-col>
</template>
