<template>
  <v-file-input
    ref="input"
    :rules="[v => !!v || '']"
    label="画像を選択"
    dense
    prepend-icon="mdi-camera"
    show-size
    accept="image/png,image/jpeg,image/gif,image/jpg"
    @change="resize"
  />
</template>
<script>
import base64ToBlob from 'b64-to-blob'
export default {
  methods: {
    resize (e) {
      const file = e

      if (!file) {
        return
      }

      const reader = new FileReader()

      reader.onload = (event) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const image = new Image()
        image.crossOrigin = 'Anonymous'

        image.onload = () => {
          if (image.height > image.width) {
            const width = 500
            const height = 700
            canvas.width = width
            canvas.height = height
            ctx.drawImage(image, 0, 0, width, height)
            const base64 = canvas.toDataURL()
            this.$emit('resized', { url: base64, blob: base64ToBlob(base64.replace(/^.*,/, '')), canvas })
          } else {
            const width = 700
            const height = 500
            canvas.width = width
            canvas.height = height
            ctx.drawImage(image, 0, 0, width, height)
            const base64 = canvas.toDataURL()
            this.$emit('resized', { url: base64, blob: base64ToBlob(base64.replace(/^.*,/, '')), canvas })
          }
        }
        image.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
