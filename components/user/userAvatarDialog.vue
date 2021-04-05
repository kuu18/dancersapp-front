<template>
  <v-dialog
    v-model="setDialog"
    max-width="600"
  >
    <v-card
      class="mx-auto"
      shaped
    >
      <v-card-title>写真の変更</v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="isValid"
        >
          <user-form-avatar
            @resized="uploadImage"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          color="primary"
          :disabled="!isValid || updateLoading"
          :loading="updateLoading"
          @click="avatarUpdate"
        >
          プロフィール写真を変更する
        </v-btn>
      </v-card-actions>
      <v-divider />
        <v-card-title>写真の削除</v-card-title>
        <v-card-actions>
          <v-btn
            block
            color="error"
            :loading="deleteLoading"
            @click="avatarDelete"
          >
            現在のプロフィール写真を削除
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import userFormAvatar from './userFormAvatar.vue'
export default {
  components: { userFormAvatar },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      blob: null,
      updateLoading: false,
      deleteLoading: false,
      isValid: false
    }
  },
  computed: {
    setDialog: {
      get () { return this.dialog },
      set (val) { return this.$emit('update:dialog', val) }
    }
  },
  methods: {
    uploadImage ({ blob }) {
      this.blob = blob
    },
    async avatarUpdate () {
      const formData = new FormData()
      formData.append('avatar', this.blob)
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      this.updateLoading = true
      await this.$axios.$patch('/api/v1/users/avatar', formData, config)
        .then(response => this.updateSuccessful(response))
      this.updeateLoading = false
    },
    updateSuccessful ({ type, msg }) {
      this.$router.go()
      this.$store.dispatch('getToast', { msg, color: type })
    },
    avatarDelete () {
      this.deleteLoading = true
      this.$axios.$patch('/api/v1/users/avatar_destroy')
        .then(response => this.deleteSuccessful(response))
      this.deleteLoading = false
    },
    deleteSuccessful ({ type, msg }) {
      this.$router.go()
      this.$store.dispatch('getToast', { msg, color: type })
    }
  }
}
</script>
