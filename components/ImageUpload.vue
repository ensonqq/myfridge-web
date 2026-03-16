<template>
  <div class="field col-xl-12 flex-column justify-content-center align-items-center">
    <div @click="$refs.input.click()" class="text-center image-container">
      <input ref="input" type='file' class="hidden" @change="onImageChange()"/>
      <div v-if="image" class="usericon center contain" :class="{imageError: error}" :style="'background-image: url(' + image + ')'"></div>
      <div v-else class="usericon center" :class="{imageError: error}">
        <div>{{ $t('clickToUploadStudentIdentity') }}<br>({{ $t('frontSideOfStudentCard') }})</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mdiImageArea} from '@mdi/js'

export default {
  name  : "ImageUpload",
  props : ['error'],
  data () {
    return {
      image : "",
    };
  },
  methods : {
    onImageChange () {
      let t = this
      if (this.$refs.input.files.length) {
        let reader = new FileReader()
        reader.onload = function (e) {
          t.image = e.target.result
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

  &.passport {
    img {
      max-height: 400px;
      border-radius: 0;
    }
  }

  img {
    border-radius: 50%;
    overflow: hidden;
  }
}

.usericon {
  cursor: pointer;
  border: 1px solid #333;
  background-image: url('../assets/images/usericon.png');
  background-size: 80px;
  background-position: center center;
  background-repeat: no-repeat;
  height: 0;
  width: 50%;
  padding-bottom: 50%;
  margin: 0 auto;
  border-radius: 10px;
  position: relative;
  transition: all 0.3s;
  @media(max-width: 500px) {
    width: 80%;
    padding-bottom: 80%;
  }

  &.contain {
    background-size: contain;
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
