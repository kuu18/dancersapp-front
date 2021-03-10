<template>
  <div>
    <ui-toaster />
    <default-form-card v-if="send === false">
      <template #form-card-content>
        <v-form
          ref="form"
          v-model="isValid"
        >
          <user-form-email
            :email.sync="params.password_reset.email"
            no-validation
          />
          <v-card-text class="px-0">
            <v-btn
              :disabled="!isValid || loading"
              :loading="loading"
              block
              color="myblue"
              class="white--text"
              @click="submit"
            >
              メール送信
            </v-btn>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <nuxt-link
              to="/signup"
              class="body-2 text-decoration-none"
            >
              新しいアカウントを作成
            </nuxt-link>
          </v-card-actions>
        </v-form>
      </template>
    </default-form-card>
    <v-container
      v-if="send === true"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-card
          style="padding-top: 50px;"
          flat
          width="80%"
          max-width="470"
          color="transparent"
        >
          <v-card-title>
            パスワード再設定メールを送信しました
          </v-card-title>
          <v-card-text>
            <ul>
              <li>{{ params.password_reset.email }} へパスワード再設定用のメールを送信しました。</li>
              <li>しばらくしてもメールが届かない場合は、迷惑メールフォルダをご確認ください。</li>
              <li>また、入力したメールアドレスが登録しているアドレスとお間違いないか今一度ご確認ください。</li>
            </ul>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <nuxt-link to="/">
              ←トップページに戻る
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AccountPasswordReset',
  layout: 'beforeLogin',
  data () {
    return {
      isValid: false,
      loading: false,
      send: false,
      params: { password_reset: { email: '' } }
    }
  },
  methods: {
    async submit () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/password_resets', this.params)
          .then(response => this.succeeded(response))
      }
      this.loading = false
    },
    succeeded ({ type, msg }) {
      if (type === 'info') {
        this.$store.dispatch('getToast', { msg, color: type, timeout: -1 })
        this.send = true
      } else if (type === 'error') {
        this.$store.dispatch('getToast', { msg, color: type })
      }
    }
  }
}
</script>
