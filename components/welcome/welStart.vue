<template>
  <v-container fluid>
    <v-row>
      <v-card-text class="text-center pb-8">
        <v-btn
          color="primary"
          x-large
          dark
          width="180"
          class="mr-10"
          to="/signup"
          link
        >
         新規会員登録
        </v-btn>
        <v-btn
          class="font-weight-bold"
          color="myred"
          x-large
          dark
          width="180"
          outlined
          to="/login"
          link
        >
         ログイン
        </v-btn>
      </v-card-text>
    </v-row>
  </v-container>
</template>

<script>
export default {
}
</script>
