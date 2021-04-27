<template>
  <v-app-bar
    light
    color="white"
  >
    <nuxt-link
      :to="`/${item.user.user_name}`"
      class="text-decoration-none"
    >
      <v-avatar
        size="30"
        class="my-avatar"
      >
        <img
          :src="item.user.avatar_url"
        >
      </v-avatar>
    </nuxt-link>
    <v-toolbar-title>{{ item.user.name }}</v-toolbar-title>

    <v-spacer />

    <v-menu
      v-if="item.user.id === $auth.user.id"
      left
      bottom
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          link
          @click="destroy(item.id)"
        >
          <v-list-item-icon>
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>削除</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    destroy (eventId) {
      const id = eventId
      this.$axios.$delete('/api/v1/eventposts/' + id)
        .then(response => this.succeeded(response))
    },
    succeeded ({ msg, type }) {
      this.$store.dispatch('getToast', { msg, color: type })
      if (this.$route.name === 'home') { this.$router.go() }
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
.my-avatar {
  margin-right: 8px;
}
</style>
