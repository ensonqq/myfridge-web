<template>
  <div class="field col-xl-12 pt-0 flex-column justify-content-center align-items-center position-relative">
    <div @click="$refs.input.click()" class="text-center image-container">
      <input ref="input" type='file' class="hidden" @change="onImageChange()"/>
      <div v-if="componentImg" class="qrcode center contain" :class="{imageError: error}" :style="'background-image: url(' + componentImg + ')'"></div>
      <div v-else class="qrcode center" :class="{imageError: error}">
        <div class="mt-2" style="line-height: 18px">按此上載轉數快FPS二維碼</div>
      </div>
    </div>
    <ul class="text-12 mb-1 mt-0 pt-1 grey--text text--darken-1" style="line-height: 16px">
      <li>從閣下銀行App下載收款碼並上傳</li>
      <li>收款二維碼請不要設置收款金額</li>
      <li>請確保您的轉數快收款二維碼及收款人名稱正確</li>
      <li>{{ $t('imageUploadSizeLimit') }}: 8mbs</li>
      <li>{{ $t('format') }}: gif, png及jpg</li>
    </ul>
    <span v-if="componentImg" @click="clearImage" class="clear-image">
      <v-icon>{{ icons.mdiClose }}</v-icon>
    </span>
  </div>
</template>

<script>
import {mdiClose} from '@mdi/js'

export default {
  name  : "FPSQrcodeUpload",
  props : ['error'],
  data () {
    return {
      icons        : {
        mdiClose
      },
      componentImg : null
    };
  },
  methods : {
    setInitImage (url) {
      this.componentImg = url
    },
    clearImage () {
      this.componentImg = null
      this.$emit('image', null)
    },
    onImageChange () {
      let t = this
      if (this.$refs.input.files.length) {
        let reader = new FileReader()
        reader.onload = function (e) {
          t.componentImg = e.target.result
        }
        reader.readAsDataURL(this.$refs.input.files[0])

        this.$emit('image', this.$refs.input.files[0])
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.image-container {
  cursor: pointer;

  img {
    border-radius: 50%;
    overflow: hidden;
  }
}

.clear-image {
  position: absolute;
  top: -10px;
  right: 0;
  background-color: white;
  border-radius: 100%;
  border: solid 1px black;
}

.qrcode {
  cursor: pointer;
  border: 1px solid #333;
  background-image: url('../assets/images/qr_icon.jpeg');
  background-size: 150px;
  background-position: center center;
  background-repeat: no-repeat;
  height: 0;
  width: 100%;
  padding-bottom: 100%;
  margin: 0 auto;
  border-radius: 10px;
  position: relative;
  transition: all 0.3s;

  &.contain {
    background-size: 90%;
    background-position: center center;
  }

  &.imageError {
    border: 1px solid red;

    div {
      color: red;
    }
  }

  div {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 70%;
    font-size: 13px;
    color: #000;
    transition: all 0.3s;
  }

  &:hover {
    box-shadow: 0px 0px 5px 0 #ccc;

    div {
      color: #3d66b7;
    }
  }
}
</style>
