<template>
  <v-file-input
    accept="image/png, image/jpeg, image/bmp"
    label="写真を選んでください"
    prepend-icon="mdi-camera"
    :rules="[v => !!v || '']"
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
          const width = 300
          const height = 300
          canvas.width = width
          canvas.height = height
          ctx.drawImage(image, 0, 0, width, height)
          const base64 = canvas.toDataURL()
          this.$emit('resized', { blob: base64ToBlob(base64.replace(/^.*,/, '')) })
        }
        image.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
